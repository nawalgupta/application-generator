import _ from 'underscore';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';

import { [[model.Names]] } from './collection';

function getContactEmail(user) {
  if (user.emails && user.emails.length)
    return user.emails[0].address;

  if (user.services && user.services.facebook && user.services.facebook.email)
    return user.services.facebook.email;

  return null;
}

export function invite([[model.name]]Id, userId) {
  check([[model.name]]Id, String);
  check(userId, String);

  if (!this.userId) {
    throw new Meteor.Error(400, 'You have to be logged in!');
  }

  const [[model.name]] = [[model.Names]].findOne([[model.name]]Id);

  if (![[model.name]]) {
    throw new Meteor.Error(404, 'No such [[model.name]]!');
  }

  if ([[model.name]].owner !== this.userId) {
    throw new Meteor.Error(404, 'No permissions!');
  }

  if ([[model.name]].public) {
    throw new Meteor.Error(400, 'That [[model.name]] is public. No need to invite people.');
  }

  if (userId !== [[model.name]].owner && ! _.contains([[model.name]].invited, userId)) {
    [[model.Names]].update([[model.name]]Id, {
      $addToSet: {
        invited: userId
      }
    });

    const replyTo = getContactEmail(Meteor.users.findOne(this.userId));
    const to = getContactEmail(Meteor.users.findOne(userId));

    if (Meteor.isServer && to) {
      Email.send({
        to,
        replyTo,
        from: 'noreply@[[app.name]].com',
        subject: `PARTY: ${[[model.name]].title}`,
        text: `
          Hey, I just invited you to ${[[model.name]].title} on [[app.Name]].
          Come check it out: ${Meteor.absoluteUrl()}
        `
      });
    }
  }
}

export function rsvp([[model.name]]Id, rsvp) {
  check([[model.name]]Id, String);
  check(rsvp, String);

  if (!this.userId) {
    throw new Meteor.Error(403, 'You must be logged in to RSVP');
  }

  if (!_.contains(['yes', 'no', 'maybe'], rsvp)) {
    throw new Meteor.Error(400, 'Invalid RSVP');
  }

  const [[model.name]] = [[model.Names]].findOne({
    _id: [[model.name]]Id,
    $or: [{
      // is public
      $and: [{
        public: true
      }, {
        public: {
          $exists: true
        }
      }]
    },{
      // is owner
      $and: [{
        owner: this.userId
      }, {
        owner: {
          $exists: true
        }
      }]
    }, {
      // is invited
      $and: [{
        invited: this.userId
      }, {
        invited: {
          $exists: true
        }
      }]
    }]
  });

  if (![[model.name]]) {
    throw new Meteor.Error(404, 'No such [[model.name]]');
  }

  const hasUserRsvp = _.findWhere([[model.name]].rsvps, {
    user: this.userId
  });

  if (!hasUserRsvp) {
    // add new rsvp entry
    [[model.Names]].update([[model.name]]Id, {
      $push: {
        rsvps: {
          rsvp,
          user: this.userId
        }
      }
    });
  } else {
    // update rsvp entry
    const userId = this.userId;
    [[model.Names]].update({
      _id: [[model.name]]Id,
      'rsvps.user': userId
    }, {
      $set: {
        'rsvps.$.rsvp': rsvp
      }
    });
  }
}

Meteor.methods({
  invite,
  rsvp
});
