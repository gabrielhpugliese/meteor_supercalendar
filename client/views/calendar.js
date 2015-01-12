Template.calendar.rendered = function () {
  return SuperCalendar.rendered.call(this);
}

Template.calendar.events({
  'click .fc-square, click .fc-day': function (e, t) {
    return SuperCalendar.events.onDayClick.apply(this, [e, t]);
  },
  'click .fc-event': function (e, t) {
    return SuperCalendar.events.onEventClick.apply(this, [e, t]);
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
