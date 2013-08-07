Mesosphere.registerRule('checkDate', function (fieldValue, ruleValue) {
    if (!ruleValue) {
        return true;
    }

    var date = fieldValue.split('-'),
        today = new Date((new Date()).setHours(0, 0, 0, 0));

    date = new Date(date[0], date[1] - 1, date[2]);
    if (+date < +today) {
        return false;
    }
    return true;
});

Mesosphere.registerRule('checkTime', function (fieldValue, ruleValue) {
    if (!ruleValue) {
        return true;
    }
    var time = fieldValue.split(':'),
        now = new Date();

    time = new Date(now.setHours(time[0], time[1]));
    if (+time < +now) {
        return false;
    }
    return true;
});

Mesosphere.registerRule('checkTitle', function (fieldValue, ruleValue) {
    if (!ruleValue) {
        return true;
    }

    if (Calendar.findOne({title: fieldValue})) {
        return false;
    }
    return true;
});

Mesosphere({
    name: 'newEvent',
    method: 'addEvent',
    fields: {
        title: {
            required: true,
            format: 'alphanumeric',
            message: 'Invalid title: already exists or length bigger than 50 or invalid chars.',
            rules: {
                maxLength: 50,
                checkTitle: true
            }
        },
        date: {
            required: true,
            transforms: ['trim'],
            rules: {
                checkDate: true
            },
            format: /^2\d{3}-[0-1]\d-[0-3]\d$/,
            message: 'Invalid date: Format YYYY-MM-DD. Check if it\'s not past.'
        },
        time: {
            required: true,
            transforms: ['trim'],
            format: function (value) {
                return _.contains(['no-time', 'has-time'], value);
            },
            message: 'Are you trying to hack me ?'
        },
        'time-value': {
            required: {
                // not working :(
                dependsOn: 'time',
                value: 'has-time'
            },
            transforms: ['trim'],
            rules: {
                checkTime: true
            },
            format: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
            message: 'Invalid time: Format HH:mm. Check if it\'s not past.'
        },
        description: {
            required: false,
            transforms: ['trim'],
            format: 'alphanumeric',
            rules: {
                maxLength: 150
            },
            message: 'Invalid descrition: length bigger than 150.'
        }
    },
    onFailure: function (errors) {
        var $alert = $('div#new-event-modal').find('div.alert'),
            messages = [];

        $alert.removeClass('hide alert-success').addClass('alert-error');
        messages = _.map(errors, function (val, err) {
            return $('<li>').text(val.message);
        });
        $alert.find('h4').text('Error!');
        $alert.find('ul').html('').append(messages);
    },
    onSuccess: function (data) {
        var $alert = $('div#new-event-modal').find('div.alert');
        $alert.removeClass('hide alert-error').addClass('alert-success');
        $alert.find('h4').text('Success!');
        $alert.find('ul').html('<li>You can close this window now.</li>');
    }
});

methods = {
    addEvent: function (rawFormData) {
        var validationObject = Mesosphere.newEvent.validate(rawFormData);
        if (validationObject.errors) {
            return;
        }

        var formData = validationObject.formData,
            date = formData.date.split('-'),
            allDay = formData.time !== 'has-time',
            time = allDay ? null : formData['time-value'].split(':');

        date = new Date(date[0], date[1] - 1, date[2]);
        if (time) {
            date = new Date(date.setHours(time[0], time[1]));
        }

        var values = {
            title: formData.title,
            start: date,
            allDay: allDay,
            description: formData.description
        };
        Calendar.insert(values);
    }
};

Meteor.methods(methods);
