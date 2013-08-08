if (Meteor.isClient) {
    new ForkMe({
      user: 'gabrielhpugliese',
      repo: 'meteor_supercalendar',
      ribbon: {
          color: 'darkblue',
          position: 'left'
        }
    });
}

if (Meteor.isServer) {
}
