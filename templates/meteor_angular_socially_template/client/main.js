import angular from 'angular';

import { Meteor } from 'meteor/meteor';

import { name as [[app.Name]] } from '../imports/ui/components/[[app.name]]/[[app.name]]';

function onReady() {
  angular.bootstrap(document, [
    [[app.Name]]
  ], {
    strictDi: true
  });
}

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
