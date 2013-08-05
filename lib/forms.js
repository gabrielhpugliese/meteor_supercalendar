Mesosphere.registerRule('checkDate', function (fieldValue, ruleValue) {
    console.log('checkDate')
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
    console.log('checkTime')
    if (!ruleValue) {
        return true;
    }
    var time = fieldValue.split(':'),
        now = new Date();

    time = new Date((new Date()).setHours(time[0], time[1]));
    if (+time < +now) {
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
            message: 'Invalid characters in title.'
        },
        date: {
            required: true,
            transforms: ['trim'],
            rules: {
                checkDate: true
            },
            format: /^2\d{3}-[0-1]\d-[0-3]\d$/,
            message: 'That date is not in format YYYY-MM-DD'
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
                dependsOn: 'time',
                value: 'has-time'
            },
            transforms: ['trim'],
            rules: {
                checkTime: true
            },
            format: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
            message: 'That time is not in format HH:mm'
        }
    },
    onFailure: function (error) {
        console.log(error);
    },
    onSuccess: function (data) {
        console.log('dude', data);
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
            time = formData.time === 'has-time' ? formData['time-value'].split(':') : null;

        date = new Date(date[0], date[1] - 1, date[2]);
        if (time) {
            date = new Date(date.setHours(time[0], time[1]));
        }

        var values = {
            title: formData.title,
            start: date
        };
        Calendar.insert(values);
    }
};

Meteor.methods(methods);
