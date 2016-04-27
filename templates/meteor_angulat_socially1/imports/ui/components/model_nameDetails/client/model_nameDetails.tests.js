import { name as [[model.Name]]Details } from '../[[model.name]]Details';
import { [[model.Names]] } from '../../../../api/[[model.names]]';
import 'angular-mocks';

describe('[[model.Name]]Details', () => {
  beforeEach(() => {
    window.module([[model.Name]]Details);
  });

  describe('controller', () => {
    let controller;
    const [[model.name]] = {
      _id: '[[model.name]]Id',
      name: 'Foo',
      description: 'Birthday of Foo',
      public: true
    };

    beforeEach(() => {
      inject(($rootScope, $componentController) => {
        controller = $componentController([[model.Name]]Details, {
          $scope: $rootScope.$new(true)
        });
      });
    });

    describe('save()', () => {
      beforeEach(() => {
        spyOn([[model.Names]], 'update');
        controller.[[model.name]] = [[model.name]];
        controller.save();
      });

      it('should update a proper [[model.name]]', () => {
        expect([[model.Names]].update.calls.mostRecent().args[0]).toEqual({
          _id: [[model.name]]._id
        });
      });

      it('should update with proper modifier', () => {
        expect([[model.Names]].update.calls.mostRecent().args[1]).toEqual({
          $set: {
            name: [[model.name]].name,
            description: [[model.name]].description,
            public: [[model.name]].public
          }
        });
      });
    });
  });
});
