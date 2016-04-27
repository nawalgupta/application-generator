import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { [[model.Names]] } from './collection';

if (Meteor.isServer) {
  Meteor.publish('[[model.names]]', function(options, searchString) {
    const selector = {
      $or: [{
        // the public [[model.names]]
        $and: [{
          public: true
        }, {
          public: {
            $exists: true
          }
        }]
      }, {
        // when logged in user is the owner
        $and: [{
          owner: this.userId
        }, {
          owner: {
            $exists: true
          }
        }]
      }, {
        // when logged in user is one of invited
        $and: [{
          invited: this.userId
        }, {
          invited: {
            $exists: true
          }
        }]
      }]
    };

    if (typeof searchString === 'string' && searchString.length) {
      selector.name = {
        $regex: `.*${searchString}.*`,
        $options : 'i'
      };
    }

    Counts.publish(this, 'numberOf[[model.Names]]', [[model.Names]].find(selector), {
      noReady: true
    });

    return [[model.Names]].find(selector, options);
  });
}
