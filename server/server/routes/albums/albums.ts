import { getAllAlbums, addAlbum, deleteAlbum } from '@server/controllers/albums/albums';
import express from 'express';

const albumRoutes = express.Router();

albumRoutes.get('/', getAllAlbums);
albumRoutes.post('/', addAlbum);
albumRoutes.delete('/:id', deleteAlbum);

export default albumRoutes;
