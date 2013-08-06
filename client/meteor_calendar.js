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
};

Template.calendar.events({
    'click div.fc-day-content' : function (event) {
        var target = event.target, 
            $modal = $('#new-event-modal'),
            date = $(target).parents('.fc-day').attr('data-date');

        $modal.modal('toggle');
        $modal.find('input[name=date]').val(date);
    }
});

Template.calendar_modal.events({
    'click input[type=radio]' : function (event) {
        if (event.target.value === 'has-time') {
            $('#time-input').show();
        } else {
            $('#time-input').hide();
        }
    },
    'click div.modal-body div.alert button.close' : function (event) {
        var $parent = $(event.target).parent();
        $parent.addClass('hide');
    }
});
