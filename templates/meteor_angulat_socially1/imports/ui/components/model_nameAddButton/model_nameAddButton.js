import angular from 'angular';
import angularMeteor from 'angular-meteor';

import './[[model.name]]AddButton.html';
import './[[model.name]]AddModal.html';
import { name as [[model.Name]]Add } from '../[[model.name]]Add/[[model.name]]Add';

class [[model.Name]]AddButton {
  constructor($mdDialog, $mdMedia) {
    'ngInject';

    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia
  }

  open(event) {
    this.$mdDialog.show({
      controller($mdDialog) {
        'ngInject';
        
        this.close = () => {
          $mdDialog.hide();
        }
      },
      controllerAs: '[[model.name]]AddModal',
      templateUrl: `imports/ui/components/${name}/[[model.name]]AddModal.html`,
      targetEvent: event,
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: this.$mdMedia('sm') || this.$mdMedia('xs')
    });
  }
}

const name = '[[model.name]]AddButton';

// create a module
export default angular.module(name, [
  angularMeteor,
  [[model.Name]]Add
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: [[model.Name]]AddButton
});
