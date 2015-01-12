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
  },
  rendered: function () {
    this.autorun(function () {
      if (! Session.get('superCalendarReady', true) ||
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
  }
};

