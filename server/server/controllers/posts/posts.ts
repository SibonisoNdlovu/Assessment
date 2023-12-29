
import { Request, Response } from 'express';
import axios from 'axios';
import {Post} from '../types'

export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts: Post[] = response.data.map((post: any) => ({
      id: post.id,
      title: post.title,
      body: post.body,
    }));
    res.json( posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send();
  }
};

export const addPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, body } = req.body;

    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
      title,
      body,
      userId: 1,
    });

    const newPost = response.data;
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error adding post:', error);
    res.status(500).send()
  }
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).send();
  }
};
