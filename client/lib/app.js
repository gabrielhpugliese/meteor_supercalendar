SuperCalendar = {
  events: {
    onEventClick: function (e, t) {
      var eventId = e.target.id || $(e.target).closest('.fc-event-hori').attr('id');
      var calEvent = Calendar.findOne(eventId);

      AntiModals.overlay('event_details', {
        data: calEvent
      });
    },
    onDayClick: function (e) {
      var target = event;
      var date = $(target).parents('.fc-day').attr('data-date') || $(target).attr('data-date');

      AntiModals.overlay('new_event_modal', {
        data: {
          date: date
        }
      });
    }
  }
};

