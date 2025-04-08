import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { USER_ID_G } from '../api/todos';

interface InputFocusProps {
  inputRef: React.RefObject<HTMLInputElement>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  todos: Todo[];
}

export const Header: React.FC<InputFocusProps> = ({
  inputRef,
  setTodos,
  setLoading,
  setError,
  todos,
}) => {
  const [task, setTask] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const allCompleted = todos.every(todo => todo.completed);

  const addTodo = async (userId: number, title: string) => {
    const response = await fetch('https://your-api.com/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        title,
        completed: false,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add todo');
    }

    return response.json();
  };

  const handleAddTodo = async () => {
    if (!task.trim()) {
      setErrorMessage('Title should not be empty');

      return;
    }

    try {
      setLoading(true);
      const newTodo = await addTodo(USER_ID_G, task);

      setTodos(prev => [...prev, newTodo]);
      setTask('');
      setErrorMessage('');
    } catch (err) {
      setError((err as Error).message || 'Can not add task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="todoapp__header">
      {/* Button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleAddTodo();
        }}
      >
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          value={task}
          onChange={e => setTask(e.target.value)}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>

      {/* Display error message if task title is empty */}
      {errorMessage && (
        <div
          data-cy="ErrorNotification"
          className="notification is-danger is-light has-text-weight-normal"
        >
          {errorMessage}
        </div>
      )}
    </header>
  );
};
