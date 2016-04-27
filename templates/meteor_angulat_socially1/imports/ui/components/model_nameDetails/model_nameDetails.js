import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import './[[model.name]]Details.html';
import { [[model.Names]] } from '../../../api/[[model.names]]';
import { name as [[model.Name]]Uninvited } from '../[[model.name]]Uninvited/[[model.name]]Uninvited';
import { name as [[model.Name]]Map } from '../[[model.name]]Map/[[model.name]]Map';

class [[model.Name]]Details {
  constructor($stateParams, $scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.[[model.name]]Id = $stateParams.[[model.name]]Id;

    this.subscribe('[[model.names]]');
    this.subscribe('users');

    this.helpers({
      [[model.name]]() {
        return [[model.Names]].findOne({
          _id: $stateParams.[[model.name]]Id
        });
      },
      users() {
        return Meteor.users.find({});
      },
      isLoggedIn() {
        return !!Meteor.userId();
      }
    });
  }

  canInvite() {
    if (!this.[[model.name]]) {
      return false;
    }

    return !this.[[model.name]].public && this.[[model.name]].owner === Meteor.userId();
  }

  save() {
    [[model.Names]].update({
      _id: this.[[model.name]]._id
    }, {
      $set: {
        name: this.[[model.name]].name,
        description: this.[[model.name]].description,
        public: this.[[model.name]].public,
        location: this.[[model.name]].location
      }
    }, (error) => {
      if (error) {
        console.log('Oops, unable to update the [[model.name]]...');
      } else {
        console.log('Done!');
      }
    });
  }
}

const name = '[[model.name]]Details';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  [[model.Name]]Uninvited,
  [[model.Name]]Map
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: [[model.Name]]Details
})
  .config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider.state('[[model.name]]Details', {
    url: '/[[model.names]]/:[[model.name]]Id',
    template: '<[[model.name]]-details></[[model.name]]-details>',
    resolve: {
      currentUser($q) {
        if (Meteor.userId() === null) {
          return $q.reject('AUTH_REQUIRED');
        } else {
          return $q.resolve();
        }
      }
    }
  });
}
