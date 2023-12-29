import express from 'express';

import albumsRoute from '@server/routes/albums/albums';
import commentsRoute from '@server/routes/comments/comments';
import photosRoute from '@server/routes/photos/photos';
import postsRoute from '@server/routes/posts/posts';
import todosRoute from '@server/routes/todos/todos';

const router = express.Router();

router.use('/albums', albumsRoute);
router.use('/comments', commentsRoute);
router.use('/photos', photosRoute);
router.use('/posts', postsRoute);
router.use('/todos', todosRoute);

export default router;
