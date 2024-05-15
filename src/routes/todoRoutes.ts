import express from 'express';
import {getAllTodos,addTodo,updateTodo,deleteTodo} from '../controller/todoController';

const router = express.Router();

router.route('/').get(getAllTodos).post(addTodo);

router.route('/:id').put(updateTodo).delete(deleteTodo);

export default router;