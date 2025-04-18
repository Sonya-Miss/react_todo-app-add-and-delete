/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Todo } from '../types/Todo';
import { TodoLoader } from './TodoLoader';
import { TodoTitle } from './TodoTitle';
import classNames from 'classnames';

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
          <div
            data-cy="TodoLoader"
            className={classNames('modal overlay', { 'is-active': loading })}
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}

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
          <span className="todo__title" data-cy="TodoTitle">
            {tempTodo.title}
          </span>
          <TodoLoader />
        </div>
      )}
    </section>
  );
};
