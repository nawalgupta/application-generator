import { name as [[model.Name]]Creator } from '../[[model.name]]Creator';
import { Meteor } from 'meteor/meteor';
import 'angular-mocks';

describe('[[model.Name]]Creator', () => {
  beforeEach(() => {
    window.module([[model.Name]]Creator);
  });

  describe('controller', () => {
    let $rootScope;
    let $componentController;
    const [[model.name]] = {
      _id: '[[model.name]]Id'
    };

    beforeEach(() => {
      inject((_$rootScope_, _$componentController_) => {
        $rootScope = _$rootScope_;
        $componentController = _$componentController_;
      });
    });

    function component(bindings) {
      return $componentController([[model.Name]]Creator, {
        $scope: $rootScope.$new(true)
      }, bindings);
    }

    it('should return an empty string if there is no [[model.name]]', () => {
      const controller = component({
        [[model.name]]: undefined
      });

      expect(controller.creator).toEqual('');
    });

    it('should say `me` if logged in is the owner', () => {
      const owner = 'userId';
      // logged in
      spyOn(Meteor, 'userId').and.returnValue(owner);
      const controller = component({
        [[model.name]]: {
          owner
        }
      });

      expect(controller.creator).toEqual('me');
    });

    it('should say `nobody` if user does not exist', () => {
      const owner = 'userId';
      // not logged in
      spyOn(Meteor, 'userId').and.returnValue(null);
      // no user found
      spyOn(Meteor.users, 'findOne').and.returnValue(undefined);
      const controller = component({
        [[model.name]]: {
          owner
        }
      });

      expect(controller.creator).toEqual('nobody');
    });

    it('should return user data if user exists and it is not logged one', () => {
      const owner = 'userId';
      // not logged in
      spyOn(Meteor, 'userId').and.returnValue(null);
      // user found
      spyOn(Meteor.users, 'findOne').and.returnValue('found');
      const controller = component({
        [[model.name]]: {
          owner
        }
      });

      expect(controller.creator).toEqual('found');
    });
  });
});
