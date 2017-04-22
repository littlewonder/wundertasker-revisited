var list = new Mongo.Collection('list');

Template.listMain.helpers({
  showList: function () {
    return list.find({},{sort:{date: -1}});
  },
  count: function(){
    let count = list.find({}).count();
    if(count===0){
      return true;
    }
    return false;
  }
});

Template.addNew.events({
  'submit form': function (event) {
    event.preventDefault();
    let task = event.target.taskName.value;
    let temp = new Date();
    list.insert({
      taskName: task,
      date: temp
    });
    event.target.taskName.value=""; //resetting placeholder
  }
});

Template.listMain.events({
'click .toggle-checkbox':function(){
  list.update(this._id, {$set:{checked : !this.checked}}); 
},
'click .delete': function(){
  if(confirm('Delete this to-do?')){
  list.remove(this._id);
  }
}
});