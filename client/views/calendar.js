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
  'click .fc-square, click .fc-day' : function (event) {
    var target = event.target;
    var date = $(target).parents('.fc-day').attr('data-date') || $(target).attr('data-date');

    AntiModals.overlay('new_event_modal', {
      data: {
        date: date
      }
    });
  },
  'click .fc-event': function (e, t) {
    var eventId = e.target.id || $(e.target).closest('.fc-event-hori').attr('id');
    var calEvent = Calendar.findOne(eventId);

    AntiModals.overlay('event_details', {
      data: calEvent
    });
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
