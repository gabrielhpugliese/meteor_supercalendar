calendarSubs = Meteor.subscribe('calendar');

Template.calendar.rendered = function () {
  var self = this;

  self.autorun(function () {
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
      },
      dayClick: function (date, flag, e, view) {
        return SuperCalendar.events.onDayClick.call(this, e, self, {
          date: date,
          view: view
        });
      },
      eventClick: function (date, flag, e, view) {
        return SuperCalendar.events.onEventClick.call(this, e, self, {
          date: date,
          view: view
        });
      }
    });
  });
};

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
