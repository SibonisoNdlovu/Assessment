import express from 'express';
import { getAllPhotos } from '@server/controllers/photos/photos';
const router = express.Router();

router.get('/', getAllPhotos);

export default router;
