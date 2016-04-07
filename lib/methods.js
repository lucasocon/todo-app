// Meteor Methods
Meteor.methods({
  addTodo: function(text) {
    if (!Meteor.userId()) {
      throw new Meteor.error('not-authorized');
    }

    Todos.insert({
      text: text,
      createdAt: new Date(),
      userId: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deleteTodo: function (todoId) {
    Todos.remove(todoId);
  },
  setChecked: function (todoId, setChecked) {
    Todos.update(todoId, {$set: {checked: setChecked}});
  }
});
