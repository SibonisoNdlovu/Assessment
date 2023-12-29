import { getAllTodos, addTodo, deleteTodo, editTodo } from '@server/controllers/todos/todos';
import express from 'express';

const router = express.Router();

router.get('/', getAllTodos);
router.post('/', addTodo);
router.delete('/:id', deleteTodo);
router.patch('/:id', editTodo); 

export default router;
