import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './[[model.name]]Remove.html';
import { [[model.Names]] } from '../../../api/[[model.names]]';

class [[model.Name]]Remove {
  remove() {
    if (this.[[model.name]]) {
      [[model.Names]].remove(this.[[model.name]]._id);
    }
  }
}

const name = '[[model.name]]Remove';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  bindings: {
    [[model.name]]: '<'
  },
  controllerAs: name,
  controller: [[model.Name]]Remove
});
