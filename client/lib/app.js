SuperCalendar = {
  events: {
    onEventClick: function (e, t, data) {
      var eventId = e.target.id || $(e.target).closest('.fc-event-hori').attr('id');
      var calEvent = Calendar.findOne(eventId);

      AntiModals.overlay('event_details', {
        data: calEvent
      });
    },
    onDayClick: function (e, t, data) {
      var target = event;
      var date = data.date;
      var month = ('0' + (date.getMonth() + 1)).slice(-2);
      var day = ('0' + date.getDate()).slice(-2);
      var formattedDate = date.getFullYear() + '-' + month + '-' + day;
      var hour = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
      var timeData = {
        timeInputStyle: 'display: none;',
        hasTimeChecked: false,
        noTimeChecked: true
      };

      if (data.view.name === 'agendaWeek' ||
          data.view.name === 'agendaDay') {
        timeData = {
          timeInputStyle: 'display: block;',
          hasTimeChecked: true,
          noTimeChecked: false
        };
      }

      AntiModals.overlay('new_event_modal', {
        data: {
          date: formattedDate,
          hour: hour,
          timeData: timeData
        }
      });
    }
  }
};

