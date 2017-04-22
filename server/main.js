var list = new Mongo.Collection('list');


Meteor.methods({
    addToDo: function (name) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('Not Authorized');
        }
        let temp = new Date();
        list.insert({
            taskName: name,
            date: temp,
            userId: Meteor.userId(),
            userName: Meteor.user().username
        });
    },
    deleteToDo: function (taskid) {
        list.remove(taskid);
    },
    updateStatus: function (taskid, checkedvalue) {
        list.update(taskid, { $set: { checked: checkedvalue } });
    }
});

Meteor.publish('todos', function () {
    return list.find();
});