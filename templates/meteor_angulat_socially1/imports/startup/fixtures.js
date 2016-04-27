import { Meteor } from 'meteor/meteor';
import { [[model.Names]] } from '../api/[[model.names]]';

Meteor.startup(() => {
  if ([[model.Names]].find().count() === 0) {
    const [[model.names]] = [{
      'name': 'Dubstep-Free Zone',
      'description': 'Fast just got faster with Nexus S.'
    }, {
      'name': 'All dubstep all the time',
      'description': 'Get it on!'
    }, {
      'name': 'Savage lounging',
      'description': 'Leisure suit required. And only fiercest manners.'
    }];

    [[model.names]].forEach(([[model.name]]) => {
      [[model.Names]].insert([[model.name]])
    });
  }
});
