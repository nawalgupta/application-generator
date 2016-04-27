import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import './[[app.name]].html';
import { name as [[model.Names]]List } from '../[[model.names]]List/[[model.names]]List';
import { name as [[model.Name]]Details } from '../[[model.name]]Details/[[model.name]]Details';
import { name as Navigation } from '../navigation/navigation';
import { name as Auth } from '../auth/auth';

class [[app.Name]] {}

const name = '[[app.name]]';

// create a module
export default angular.module(name, [
  angularMeteor,
  ngMaterial,
  uiRouter,
  [[model.Names]]List,
  [[model.Name]]Details,
  Navigation,
  Auth,
  'accounts.ui'
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: [[app.Name]]
})
  .config(config)
  .run(run);

function config($locationProvider, $urlRouterProvider, $mdIconProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/[[model.names]]');

  const iconPath =  '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/';

  $mdIconProvider
    .iconSet('social',
      iconPath + 'svg-sprite-social.svg')
    .iconSet('action',
      iconPath + 'svg-sprite-action.svg')
    .iconSet('communication',
      iconPath + 'svg-sprite-communication.svg')
    .iconSet('content',
      iconPath + 'svg-sprite-content.svg')
    .iconSet('toggle',
      iconPath + 'svg-sprite-toggle.svg')
    .iconSet('navigation',
      iconPath + 'svg-sprite-navigation.svg')
    .iconSet('image',
      iconPath + 'svg-sprite-image.svg');
}

function run($rootScope, $state) {
  'ngInject';

  $rootScope.$on('$stateChangeError',
    (event, toState, toParams, fromState, fromParams, error) => {
      if (error === 'AUTH_REQUIRED') {
        $state.go('[[model.names]]');
      }
    }
  );
}
