Meteor SuperCalendar
================

Smart package for SuperCalendar. Google Calendar-like as smart package

## Demo

http://supercalendar.meteor.com

## Install

To install in a new project:
```bash
> meteor add gabrielhpugliese:supercalendar
```

## Quick Start

1. In your body or any template, you can simply add the calendar view:

        <body>
          {{> calendar}}
        </body>

2. Publish the `Calendar` data on server:

        Meteor.publish('calendar', function () {
          return Calendar.find();
        });

3. Subscribe on client and set the `superCalendarReady` session var to `true`:

        Meteor.subscribe('calendar', function () {
          Session.set('superCalendarReady', true);
        });

## Customization

### Custom events

*client:* Override pre-defined function events within `SuperCalendar.events` to add your own behaviours.

Example (if you want to override a click on a day square):
```javascript
SuperCalendar.events.onDayClick = function (event, template, data) {
// put your custom code here.
};
```

Those are events supported by now. Create an issue to request more:

* onDayClick: when users click on a day square.
* onEventClick: when users click on a registered event.

The `data` param has the keys:

* date: Date() that was clicked.
* view: view that user is in.

### Custom rendered event

*client:* Override `SuperCalendar.rendered` to send your own rendered callback to Meteor. Note that you are going to implement the fullCalendar initalization. This does not override other events.

Example:
```javascript
SuperCalendar.rendered = function () {
// Do something custom.
}
```

## Model configuration

*both:* Use `Calendar` collection to add events. If you don't want to publish it all, create an issue to request the removal.

## Third party projects included

Thanks for those wonderful packages I'm using:
* [Anti:Modals](https://atmospherejs.com/anti/modals) for modals. Take a look how to to it in `client/lib/app.js`
* [Mesosphere](https://github.com/copleykj/Mesosphere) for form. Take a look how to do it in `lib/forms.js`
  validation
* [FullCalendar](http://arshaw.com/fullcalendar/) for Google Calendar-like UI
