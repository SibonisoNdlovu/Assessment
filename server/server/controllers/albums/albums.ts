import axios from 'axios';
import { Request, Response } from 'express';

export const getAllAlbums = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
    const albums = response.data;
    res.json( albums);
  } catch (error) {
    console.error('Error fetching albums:', error);
    res.status(500);
  }
};

export const addAlbum = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title } = req.body;
    const response = await axios.post('https://jsonplaceholder.typicode.com/albums', {
      title,
      userId: 1, 
    });

    const newAlbum = response.data;
    res.status(201).json( newAlbum);
  } catch (error) {
    console.error('Error adding album:', error);
    res.status(500);
  }
};

export const deleteAlbum = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await axios.delete(`https://jsonplaceholder.typicode.com/albums/${id}`);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting album:', error);
    res.status(500);
  }
};
