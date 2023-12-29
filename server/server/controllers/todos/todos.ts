
import { Request, Response } from 'express';
import axios from 'axios';
import { Todo } from '../types';

export const getAllTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
    const todos: Todo[] = response.data.map((todo: any) => ({
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
    }));
    res.json( todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).send();
  }
};

export const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, completed } = req.body;

    const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed,
      userId: 1,
    });

    const newTodo = response.data;
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error adding todo:', error);
    res.status(500).send();
  }
};

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).send();
  }
};

export const editTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const response = await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      title,
      completed,
    });

    const updatedTodo = response.data;
    res.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).send();
  }
};
