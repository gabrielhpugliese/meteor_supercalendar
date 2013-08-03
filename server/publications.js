Meteor.publish('calendar', function () {
    return Calendar.find();
});
