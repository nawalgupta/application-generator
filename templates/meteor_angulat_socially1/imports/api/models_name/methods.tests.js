import { invite, rsvp } from './methods';
import { [[model.Names]] } from './collection';

import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
  describe('[[model.Names]] / Methods', () => {
    describe('invite', () => {
      function loggedIn(userId = 'userId') {
        return {
          userId
        };
      }

      it('should be called from Method', () => {
        spyOn(invite, 'apply');

        try {
          Meteor.call('invite');
        } catch (e) {}

        expect(invite.apply).toHaveBeenCalled();
      });

      it('should fail on missing [[model.name]]Id', () => {
        expect(() => {
          invite.call({});
        }).toThrowError();
      });

      it('should fail on missing userId', () => {
        expect(() => {
          invite.call({}, '[[model.name]]Id');
        }).toThrowError();
      });

      it('should fail on not logged in', () => {
        expect(() => {
          invite.call({}, '[[model.name]]Id', 'userId');
        }).toThrowError(/logged in/i);
      });

      it('should look for a [[model.name]]', () => {
        const [[model.name]]Id = '[[model.name]]Id';
        spyOn([[model.Names]], 'findOne');

        try {
          invite.call(loggedIn(), [[model.name]]Id, 'userId');
        } catch (e) {}

        expect([[model.Names]].findOne).toHaveBeenCalledWith([[model.name]]Id);
      });

      it('should fail if [[model.name]] does not exist', () => {
        spyOn([[model.Names]], 'findOne').and.returnValue(undefined);

        expect(() => {
          invite.call(loggedIn(), '[[model.name]]Id', 'userId');
        }).toThrowError(/404/);
      });

      it('should fail if logged in user is not the owner', () => {
        spyOn([[model.Names]], 'findOne').and.returnValue({
          owner: 'notUserId'
        });

        expect(() => {
          invite.call(loggedIn(), '[[model.name]]Id', 'userId');
        }).toThrowError(/404/);
      });

      it('should fail on public [[model.name]]', () => {
        spyOn([[model.Names]], 'findOne').and.returnValue({
          owner: 'userId',
          public: true
        });

        expect(() => {
          invite.call(loggedIn(), '[[model.name]]Id', 'userId');
        }).toThrowError(/400/);
      });

      it('should NOT invite user who is the owner', () => {
        spyOn([[model.Names]], 'findOne').and.returnValue({
          owner: 'userId'
        });
        spyOn([[model.Names]], 'update');

        invite.call(loggedIn(), '[[model.name]]Id', 'userId');

        expect([[model.Names]].update).not.toHaveBeenCalled();
      });

      it('should NOT invite user who has been already invited', () => {
        spyOn([[model.Names]], 'findOne').and.returnValue({
          owner: 'userId',
          invited: ['invitedId']
        });
        spyOn([[model.Names]], 'update');

        invite.call(loggedIn(), '[[model.name]]Id', 'invitedId');

        expect([[model.Names]].update).not.toHaveBeenCalled();
      });

      it('should invite user who has not been invited and is not the owner', () => {
        const [[model.name]]Id = '[[model.name]]Id';
        const userId = 'notInvitedId';
        spyOn([[model.Names]], 'findOne').and.returnValue({
          owner: 'userId',
          invited: ['invitedId']
        });
        spyOn([[model.Names]], 'update');
        spyOn(Meteor.users, 'findOne').and.returnValue({});

        invite.call(loggedIn(), [[model.name]]Id, userId);

        expect([[model.Names]].update).toHaveBeenCalledWith([[model.name]]Id, {
          $addToSet: {
            invited: userId
          }
        });
      });
    });

    describe('rsvp', () => {
      function loggedIn(userId = 'userId') {
        return {
          userId
        };
      }

      it('should be called from Method', () => {
        spyOn(rsvp, 'apply');

        try {
          Meteor.call('rsvp');
        } catch (e) {}

        expect(rsvp.apply).toHaveBeenCalled();
      });

      it('should fail on missing [[model.name]]Id', () => {
        expect(() => {
          rsvp.call({});
        }).toThrowError();
      });

      it('should fail on missing rsvp', () => {
        expect(() => {
          rsvp.call({}, '[[model.name]]Id');
        }).toThrowError();
      });

      it('should fail if not logged in', () => {
        expect(() => {
          rsvp.call({}, '[[model.name]]Id', 'rsvp');
        }).toThrowError(/403/);
      });

      it('should fail on wrong answer', () => {
        expect(() => {
          rsvp.call(loggedIn(), '[[model.name]]Id', 'wrong');
        }).toThrowError(/400/);
      });

      ['yes', 'maybe', 'no'].forEach((answer) => {
        it(`should pass on '${answer}'`, () => {
          expect(() => {
            rsvp.call(loggedIn(), '[[model.name]]Id', answer);
          }).not.toThrowError(/400/);
        });
      });

      // TODO: more tests  
    });
  });
}
