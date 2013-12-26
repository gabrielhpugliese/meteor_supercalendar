Package.describe({
    summary: "Google Calendar-like as smart package"
});

Package.on_use(function (api, where) {
    // Client
    api.use([
            'standard-app-packages',
            'meteor',
            'startup',
            'templating',
            'session',
            'deps',
            'preserve-inputs',
            'jquery',
            'bootstrap',
            'less',
            'accounts-ui'
    ], 'client');
    api.add_files([
                  'client/stylesheets/calendar.less',
                  'client/stylesheets/fullcalendar.css',
                  'client/stylesheets/fullcalendar.print.css',
                  'client/stylesheets/jquery-ui-1.10.3.custom.css',
                  'client/views/calendar.html',
                  'client/views/calendar.js'
    ], 'client');
    api.add_files([
                  'client/compatibility/fullcalendar.js',
                  'client/compatibility/jquery.livequery.js',
                  'client/compatibility/jquery-ui-1.10.3.custom.js'
    ], 'client', {raw: true});

    // Both
    api.use([
            'Mesosphere', 
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
    }

});
