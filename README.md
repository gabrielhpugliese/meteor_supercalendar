Meteor SuperCalendar
================

Smart package for SuperCalendar. Google Calendar-like as smart package

## Demo

http://supercalendar.meteor.com

## Mantained by CodersTV

This package is used and mantained by [CodersTV](http://coderstv.com)

## Install

To install in a new project:
```bash
> mrt add supercalendar
```

To update an existing project:
```bash
> mrt update supercalendar
```

## Quick Start

In your body or any template, you can simply add the calendar view (required), new event modal view and event details view:

```html
<body>
  {{> calendar}}
  {{> new_event_modal}}
  {{> event_details}}
</body>
```

## Configuration

If you want to have your own event view/model, just rewrite
new_event_modal and event_details views. Use `Calendar` collection to
add events.

I'm using [Mesosphere](https://github.com/copleykj/Mesosphere) for form validation. Take a look how to do it in
lib/forms.js

## Third party projects included

Thanks for those wonderful packages I'm using:
* [Mesosphere](https://github.com/copleykj/Mesosphere) for form
  validation
* [FullCalendar](http://arshaw.com/fullcalendar/) for Google Calendar-like UI
