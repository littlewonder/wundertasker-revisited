import { Meteor } from 'meteor/meteor'
var list = new Mongo.Collection('list');
Meteor.subscribe('todos');
Template.listMain.helpers({
  showList: function () {
    return list.find({ userId: Meteor.userId() }, { sort: { date: -1 } });
  },
  count: function () {
    let count = list.find({}).count();
    if (count === 0) {
      return true;
    }
    return false;
  }
});

Template.addNew.events({
  'submit form': function (event) {
    event.preventDefault();
    let task = event.target.taskName.value;
    Meteor.call('addToDo', task);
    event.target.taskName.value = ""; //resetting placeholder
  }
});

Template.listMain.events({
  'click .toggle-checkbox': function () {
    Meteor.call('updateStatus', this._id, !this.checked);
  },
  'click .delete': function () {
    if (confirm('Delete this to-do?')) {
      Meteor.call('deleteToDo', this._id);
    }
  }
});


Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});