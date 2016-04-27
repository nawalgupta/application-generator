import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './[[model.name]]RsvpsList.html';

class [[model.Name]]RsvpsList { }

const name = '[[model.name]]RsvpsList';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  bindings: {
    rsvps: '<'
  },
  controller: [[model.Name]]RsvpsList
});
