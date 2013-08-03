Calendar = new Meteor.Collection('calendar');

Calendar.allow({
    insert : function (userId, doc) {
        check(doc.title, String); 
        check(doc.start, Date); 
        check(doc.allDay, Boolean);
        var today = new Date((new Date()).setHours(0, 0, 0, 0));
        if (+(doc.start) >= +(today)) {
            if (doc.allDay) {
                return true;
            }

            var now = new Date();
            if (+(doc.start) >= +(now)) {
                return true;    
            }
        }
        
        return false;
    },
    update : function (userId, doc, field, modifier) {
        return false;
    },
    remove : function (userId, doc) {
        return doc.owner === userId;
    },
    fetch: ['owner']
});

CalendarFacade = {
    addEvent : function (values) {
        Calendar.insert(values);
    }
}
