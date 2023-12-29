import { getAllComments, addComment, deleteComment } from '@server/controllers/comments/comments';
import express from 'express';

const router = express.Router();

router.get('/', getAllComments);
router.post('/', addComment);
router.delete('/:id', deleteComment);

export default router;
