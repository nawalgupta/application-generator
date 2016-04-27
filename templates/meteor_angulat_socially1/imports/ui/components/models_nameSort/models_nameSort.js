import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './[[model.names]]Sort.html';

class [[model.Names]]Sort {
  constructor() {
    this.changed();
  }

  changed() {
    this.onChange({
      sort: {
        [this.property]: parseInt(this.order)
      }
    });
  }
}

const name = '[[model.names]]Sort';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  bindings: {
    onChange: '&',
    property: '@',
    order: '@'
  },
  controllerAs: name,
  controller: [[model.Names]]Sort
});
