Meteor.subscribe('calendar');

Meteor.startup(function () {
    Session.set('calendarTemplateRendered', false);
});

Deps.autorun(function () {
    if (Session.equals('calendarTemplateRendered', false))
        return;
    var entries = Calendar.find().fetch(),
        $calendar = $('#calendar');

    $calendar.html('');
    $calendar.fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        editable: false,
        events: entries
    });
});

Template.calendar.rendered = function () {
    Session.set('calendarTemplateRendered', true);
}

Template.calendar.events({
    'click td.fc-day' : function (event) {
        var target = event.target.localName === 'td' ? event.target : $(event.target).parent().parent().parent(), 
            $modal = $('#new-event-modal'),
            date = $(target).attr('data-date');

        $modal.modal('toggle');
        $modal.find('input[name=date]').val(date);
    }
});

Template.calendar_modal.events({
    'submit form': function (event) {
        event.preventDefault();
        return false;
    },
    'click button#save-event' : function (event) {
        var $modal = $('#new-event-modal'),
            $form = $modal.find('form'),
            formValues = {allDay: false};
        
        formValues.start = $form.find('input[name=date]').val();
        formValues.title = $form.find('input[name=title]').val();
        if ($form.find('input[type=radio]:checked').val() === 'no-time') {
            formValues.allDay = true;
        } else {
            formValues.start = formValues.start + ' ' + $form.find('input[name=time-value]').val();
        }
        formValues.start = moment(formValues.start.trim(), 'YYYY-MM-DD HH:mm').toDate();

        console.log(formValues)
        CalendarFacade.addEvent(formValues);        
    },
    'click input[type=radio]' : function (event) {
        if (event.target.value === 'has-time') {
            $('#time-input').show();
        } else {
            $('#time-input').hide();
        }
    }
})
