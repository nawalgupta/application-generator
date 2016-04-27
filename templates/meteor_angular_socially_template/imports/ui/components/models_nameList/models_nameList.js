import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Counts } from 'meteor/tmeasday:publish-counts';

import './[[model.names]]List.html';
import { [[model.Names]] } from '../../../api/[[model.names]]';
import { name as [[model.Names]]Sort } from '../[[model.names]]Sort/[[model.names]]Sort';
import { name as [[model.Names]]Map } from '../[[model.names]]Map/[[model.names]]Map';
import { name as [[model.Name]]AddButton } from '../[[model.name]]AddButton/[[model.name]]AddButton';
import { name as [[model.Name]]Remove } from '../[[model.name]]Remove/[[model.name]]Remove';
import { name as [[model.Name]]Creator } from '../[[model.name]]Creator/[[model.name]]Creator';
import { name as [[model.Name]]Rsvp } from '../[[model.name]]Rsvp/[[model.name]]Rsvp';
import { name as [[model.Name]]RsvpsList } from '../[[model.name]]RsvpsList/[[model.name]]RsvpsList';
import { name as [[model.Name]]Image } from '../[[model.name]]Image/[[model.name]]Image';

class [[model.Names]]List {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.perPage = 3;
    this.page = 1;
    this.sort = {
      name: 1
    };
    this.searchText = '';

    this.subscribe('[[model.names]]', () => [{
        limit: parseInt(this.perPage),
        skip: parseInt((this.getReactively('page') - 1) * this.perPage),
        sort: this.getReactively('sort')
      }, this.getReactively('searchText')
    ]);

    this.subscribe('users');
    this.subscribe('images');

    this.helpers({
      [[model.names]]() {
        return [[model.Names]].find({}, {
          sort : this.getReactively('sort')
        });
      },
      [[model.names]]Count() {
        return Counts.get('numberOf[[model.Names]]');
      },
      isLoggedIn() {
        return !!Meteor.userId();
      },
      currentUserId() {
        return Meteor.userId();
      }
    });
  }

  isOwner([[model.name]]) {
    return this.isLoggedIn && [[model.name]].owner === this.currentUserId;
  }

  pageChanged(newPage) {
    this.page = newPage;
  }

  sortChanged(sort) {
    this.sort = sort;
  }
}

const name = '[[model.names]]List';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination,
  [[model.Names]]Sort,
  [[model.Names]]Map,
  [[model.Name]]AddButton,
  [[model.Name]]Remove,
  [[model.Name]]Creator,
  [[model.Name]]Rsvp,
  [[model.Name]]RsvpsList,
  [[model.Name]]Image
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: [[model.Names]]List
})
  .config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('[[model.names]]', {
      url: '/[[model.names]]',
      template: '<[[model.names]]-list></[[model.names]]-list>'
    });
}
