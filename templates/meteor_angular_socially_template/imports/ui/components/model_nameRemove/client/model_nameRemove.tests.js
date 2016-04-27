import { name as [[model.Name]]Remove } from '../[[model.name]]Remove';
import { [[model.Names]] } from '../../../../api/[[model.names]]';
import 'angular-mocks';

describe('[[model.Name]]Remove', () => {
  beforeEach(() => {
    window.module([[model.Name]]Remove);
  });

  describe('controller', () => {
    let controller;
    const [[model.name]] = {
      _id: '[[model.name]]Id'
    };

    beforeEach(() => {
      inject(($rootScope, $componentController) => {
        controller = $componentController([[model.Name]]Remove, {
          $scope: $rootScope.$new(true)
        }, {
          [[model.name]]
        });
      });
    });

    describe('remove()', () => {
      beforeEach(() => {
        spyOn([[model.Names]], 'remove');
        controller.remove();
      });

      it('should remove a [[model.name]]', () => {
        expect([[model.Names]].remove).toHaveBeenCalledWith([[model.name]]._id);
      });
    });
  });
});
