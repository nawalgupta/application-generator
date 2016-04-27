import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import './[[model.name]]Creator.html';
import { name as DisplayNameFilter } from '../../filters/displayNameFilter';

/**
 * [[model.Name]]Creator component
 */
class [[model.Name]]Creator {
  constructor($scope) {
    'ngInject';

    $scope.viewModel(this);

    this.helpers({
      creator() {
        if (!this.[[model.name]]) {
          return '';
        }

        const owner = this.[[model.name]].owner;

        if (Meteor.userId() !== null && owner === Meteor.userId()) {
          return 'me';
        }

        return Meteor.users.findOne(owner) || 'nobody';
      }
    });
  }
}

const name = '[[model.name]]Creator';

// create a module
export default angular.module(name, [
  angularMeteor,
  DisplayNameFilter
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  bindings: {
    [[model.name]]: '<'
  },
  controller: [[model.Name]]Creator
});
