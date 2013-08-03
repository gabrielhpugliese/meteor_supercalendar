Calendar = new Meteor.Collection('calendar');

Calendar.allow({
    insert : function (userId, doc) {
        return true;
    },
    update : function (userId, doc, field, modifier) {
        return false;
    },
    remove : function (userId, doc) {
        return doc.owner === userId;
    },
    fetch: ['owner']
});
