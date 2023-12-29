
import { Request, Response } from 'express';
import axios from 'axios';
import { Comment } from '../types';

export const getAllComments = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
    const comments: Comment[] = response.data.map((comment: any) => ({
      id: comment.id,
      name: comment.name,
    }));
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).send();
  }
};

export const addComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    const response = await axios.post('https://jsonplaceholder.typicode.com/comments', {
      name,
    });

    const newComment = response.data;
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).send();
  }
};

export const deleteComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await axios.delete(`https://jsonplaceholder.typicode.com/comments/${id}`);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).send();
  }
};
