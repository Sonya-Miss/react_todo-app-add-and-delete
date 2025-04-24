/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Todo } from '../types/Todo';
// import { TodoLoader } from './TodoLoader';
// import { TodoTitle } from './TodoTitle';
// import classNames from 'classnames';
import { TodoItem } from './TodoItem';

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
  // loading,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onTodoStatusChange={onTodoStatusChange}
        />
      ))}

      {tempTodo && (
        <TodoItem
          key={0}
          todo={tempTodo}
          onDelete={() => {}} // або null-функція, якщо не треба
          onTodoStatusChange={() => {}}
          isLoading={true}
        />
      )}
    </section>
  );
};
