Package.describe({
  name: "gabrielhpugliese:supercalendar",
  summary: "Google Calendar-like as smart package",
  version: "0.5.0",
  git: "https://github.com/gabrielhpugliese/meteor_supercalendar"
});

Package.onUse(function (api, where) {
  api.versionsFrom('METEOR@0.9.2');

  // Other packages
  api.use('copleykj:mesosphere@0.1.14');
  api.use('anti:modals@0.4.0');
  // Client
  api.use([
    'startup',
    'templating',
    'session',
    'tracker',
    'preserve-inputs',
    'jquery',
    'less',
  ], 'client');
  api.add_files([
    'client/lib/app.js',
    'client/stylesheets/calendar.less',
    'client/stylesheets/fullcalendar.css',
    'client/stylesheets/fullcalendar.print.css',
    'client/stylesheets/jquery-ui-1.10.3.custom.css',
    'client/views/calendar.html',
    'client/views/calendar.js'
  ], 'client');
  api.add_files([
    'client/compatibility/fullcalendar.js',
    'client/compatibility/jquery-ui-1.10.3.custom.js'
  ], 'client', {raw: true});

  // Both
  api.use([
    'underscore'
  ], ['client', 'server']);
  api.add_files([
    'lib/models.js',
    'lib/forms.js'
  ], ['client', 'server']);

  // Server
  api.add_files([
    'server/publications.js'
  ], 'server');

  if (typeof api.export !== 'undefined') {
    api.export('Calendar', ['client', 'server']);
    api.export('SuperCalendar', ['client']);
  }

});
