import { getAllPosts, addPost, deletePost } from '@server/controllers/posts/posts';
import express from 'express';

const router = express.Router();

router.get('/', getAllPosts);
router.post('/', addPost);
router.delete('/:id', deletePost);

export default router;
