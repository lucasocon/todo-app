import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

// Template Helpers
Template.main.helpers({
  todos: function() {
    return Todos.find({}, {sort: {createdAt: -1}});
  }
});

Template.main.events({
  "submit .new-todo": function (event) {
    var text = event.target.text.value;
    Meteor.call('addTodo', text);

    // Clear Form
    event.target.text.value = "";

    //Prevent Submit
    return false;
  },
  "click .toggle-checked": function (event){
    Meteor.call('setChecked', this._id, !this.checked);
  },
  "click .delete-todo": function () {
    if (confirm("Are you sure?")) {
      Meteor.call('deleteTodo', this._id);
    }
  }
});

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
})
