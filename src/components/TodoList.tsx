/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Todo } from '../types/Todo';
import { TodoLoader } from './TodoLoader';
import { TodoTitle } from './TodoTitle';

interface TodoListProps {
  todos: Todo[];
  onTodoStatusChange: (id: number) => void;
  onDelete: (id: number) => void;
  tempTodo: Todo | null;
  loading: boolean;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onTodoStatusChange,
  onDelete,
  tempTodo,
  loading,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {loading && <div className="modal-overlay is-active">Loading...</div>}
      {tempTodo && (
        <div className="todo" data-cy="Todo">
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
              disabled
              checked={false}
            />
          </label>
          <span className="todo__title">{tempTodo.title}</span>
          <TodoLoader />
        </div>
      )}

      {todos.map(todo => (
        <div
          key={todo.id}
          className={`todo ${todo.completed ? 'completed' : ''}`}
          data-cy="Todo"
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => onTodoStatusChange(todo.id)}
            />
          </label>
          <TodoTitle todo={todo} onDelete={onDelete} />
          <TodoLoader />
        </div>
      ))}
    </section>
  );
};
