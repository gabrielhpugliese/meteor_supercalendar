calendarSubs = Meteor.subscribe('calendar');

Template.calendar.rendered = function () {
  this.autorun(function () {
    if (! calendarSubs.ready() ||
        typeof Calendar === 'undefined') {
      return;
    }
    var entries = Calendar.find().fetch();
    var $calendar = $('#calendar');

    $calendar.html('').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      editable: false,
      events: entries,
      eventRender: function (event, element) {
        $(element).attr('id', event._id);
      }
    });
  });
};

Template.calendar.events({
  'click .fc-square, click .fc-day': function (e, t) {
    return SuperCalendar.events.onDayClick(e, t);
  },
  'click .fc-event': function (e, t) {
    return SuperCalendar.events.onEventClick(e, t);
  }
});

Template.new_event_modal.events({
  'click input[type=radio]': function (event, t) {
    var $timeInput = t.$('#time-input');
    if (event.target.value === 'has-time') {
      $timeInput.show();
    } else {
      $timeInput.hide();
    }
  }
});
