Meteor.subscribe('calendar');

Meteor.startup(function () {
    Session.set('calendarTemplateRendered', false);
});

Deps.autorun(function () {
    if (Session.equals('calendarTemplateRendered', false))
        return;
    var entries = Calendar.find().fetch(); 

    $('#calendar').html('');
    $('#calendar').fullCalendar({
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
    'click td.fc-day' : function () {
        $('#new-event-modal').toggleClass('hide');
    },
    'click button#save-event' : function () {
        $('#new-event-modal').toggleClass('hide');
    }
});
