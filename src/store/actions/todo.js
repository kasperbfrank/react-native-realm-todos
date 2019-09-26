const type = action => `[TODOS] ${action}`;

export const TodoAction = {
  ADD: type('Add'),
  UPDATE: type('Update'),
  CLEAR: type('Clear'),
};

export const addTodo = payload => ({type: TodoAction.ADD, payload});
export const updateTodo = payload => ({type: TodoAction.UPDATE, payload});
export const clearTodos = () => ({type: TodoAction.CLEAR});
