
import { Request, Response } from 'express';
import axios from 'axios';

export const getAllPhotos = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
    const photos = response.data;
    res.json( photos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).send();
  }
};
