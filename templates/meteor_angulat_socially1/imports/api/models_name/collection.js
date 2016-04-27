import { Mongo } from 'meteor/mongo';

export const [[model.Names]] = new Mongo.Collection('[[model.names]]');

[[model.Names]].allow({
  insert(userId, [[model.name]]) {
    return userId && [[model.name]].owner === userId;
  },
  update(userId, [[model.name]], fields, modifier) {
    return userId && [[model.name]].owner === userId;
  },
  remove(userId, [[model.name]]) {
    return userId && [[model.name]].owner === userId;
  }
});
