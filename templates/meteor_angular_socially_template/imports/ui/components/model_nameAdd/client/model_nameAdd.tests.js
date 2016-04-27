import { Meteor } from 'meteor/meteor';
import { name as [[model.Name]]Add } from '../[[model.name]]Add';
import { [[model.Names]] } from '../../../../api/[[model.names]]';
import 'angular-mocks';

describe('[[model.Name]]Add', () => {
  beforeEach(() => {
    window.module([[model.Name]]Add);
  });

  describe('controller', () => {
    let controller;
    const [[model.name]] = {
      name: 'Foo',
      description: 'Birthday of Foo',
      public: true
    };
    const user = {
      _id: 'userId'
    };

    beforeEach(() => {
      inject(($rootScope, $componentController) => {
        controller = $componentController([[model.Name]]Add, {
          $scope: $rootScope.$new(true)
        });
      });

      spyOn(Meteor, 'user').and.returnValue(user);
    });

    describe('reset()', () => {
      it('should clean up [[model.name]] object', () => {
        controller.[[model.name]] = [[model.name]];
        controller.reset();

        expect(controller.[[model.name]]).toEqual({});
      });
    });

    describe('submit()', () => {
      beforeEach(() => {
        spyOn([[model.Names]], 'insert');
        spyOn(controller, 'reset').and.callThrough();

        controller.[[model.name]] = [[model.name]];

        controller.submit();
      });

      it('should insert a new [[model.name]]', () => {
        expect([[model.Names]].insert).toHaveBeenCalledWith({
          name: [[model.name]].name,
          description: [[model.name]].description,
          public: [[model.name]].public,
          owner: user._id
        });
      });

      it('should call reset()', () => {
        expect(controller.reset).toHaveBeenCalled();
      });
    });
  });
});
