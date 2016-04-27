import angular from 'angular';
import _ from 'underscore';

const name = 'uninvitedFilter';

function UninvitedFilter(users, [[model.name]]) {
  if (![[model.name]]) {
    return false;
  }

  return users.filter((user) => {
    // if not the owner and not invited
    return user._id !== [[model.name]].owner && !_.contains([[model.name]].invited, user._id);
  });
}

// create a module
export default angular.module(name, [])
  .filter(name, () => {
    return UninvitedFilter;
  });
