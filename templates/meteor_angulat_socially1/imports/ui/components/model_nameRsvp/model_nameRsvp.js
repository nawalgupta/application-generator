import angular from 'angular';
import angularMeteor from 'angular-meteor';
import _ from 'underscore';

import { Meteor } from 'meteor/meteor';

import './[[model.name]]Rsvp.html';

class [[model.Name]]Rsvp {
  yes() {
    this.answer('yes');
  }
  isYes() {
    return this.isAnswer('yes');
  }

  maybe() {
    this.answer('maybe');
  }
  isMaybe() {
    return this.isAnswer('maybe');
  }

  no() {
    this.answer('no');
  }
  isNo() {
    return this.isAnswer('no');
  }

  answer(answer) {
    Meteor.call('rsvp', this.[[model.name]]._id, answer, (error) => {
      if (error) {
        console.error('Oops, unable to rsvp!');
      } else {
        console.log('RSVP done!')
      }
    });
  }
  isAnswer(answer) {
    if(this.[[model.name]]) {
      return !!_.findWhere(this.[[model.name]].rsvps, {
        user: Meteor.userId(),
        rsvp: answer
      });
    }
  }
}

const name = '[[model.name]]Rsvp';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  bindings: {
    [[model.name]]: '<'
  },
  controller: [[model.Name]]Rsvp
});
