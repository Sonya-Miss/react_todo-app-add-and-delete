import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID_G = 1;

export const getTodos = (USER_ID: number) => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const handleAddTodoApi = ({
  title,
  userId,
  completed,
}: Omit<Todo, 'id'>) => {
  return client.post<Todo>(`/todos`, {
    title,
    userId,
    completed,
  });
};
// Add more methods here
