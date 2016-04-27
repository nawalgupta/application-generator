import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import './[[model.name]]Add.html';
import { [[model.Names]] } from '../../../api/[[model.names]]';
import { name as [[model.Name]]Upload } from '../[[model.name]]Upload/[[model.name]]Upload';

class [[model.Name]]Add {
  constructor() {
    this.[[model.name]] = {};
  }

  submit() {
    this.[[model.name]].owner = Meteor.user()._id;
    [[model.Names]].insert(this.[[model.name]]);

    if(this.done) {
      this.done();
    }

    this.reset();
  }

  reset() {
    this.[[model.name]] = {};
  }
}

const name = '[[model.name]]Add';

// create a module
export default angular.module(name, [
  angularMeteor,
  [[model.Name]]Upload
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  bindings: {
    done: '&?'
  },
  controllerAs: name,
  controller: [[model.Name]]Add
});
