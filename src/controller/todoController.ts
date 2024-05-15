import { Request, Response } from 'express';
import * as todoService from '../service/todoService';

const getAllTodos = async (req: Request, res: Response): Promise<Response> => {
    try {
        const todos: any[] = await todoService.getAllTodos();
        return res.status(200).json(todos);
    } catch (error) {
        console.error('Error getting todos:', error);
        return res.status(500).json({ error: 'Failed to fetch todos' });
    }
}

const addTodo = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { title, description }: { title: string, description?: string } = req.body;
        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }
        const newTodo: any = await todoService.addTodo({ title, description });
        return res.status(201).json(newTodo);
    } catch (error) {
        console.error('Error adding todo:', error);
        return res.status(500).json({ error: 'Failed to add todo' });
    }
}

const updateTodo = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        console.log(id)
        const { title, description }: { title?: string, description?: string } = req.body;
        const updatedTodo: any | null = await todoService.updateTodo(parseInt(id), { title, description });
        console.log(updateTodo)
        if (!updatedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        return res.status(200).json(updatedTodo);
    } catch (error) {
        console.error('Error updating todo:', error);
        return res.status(500).json({ error: 'Failed to update todo' });
    }
}

const deleteTodo = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        await todoService.deleteTodo(id);
        return res.status(204).send(); // No content
    } catch (error) {
        console.error('Error deleting todo:', error);
        return res.status(500).json({ error: 'Failed to delete todo' });
    }
}

export { getAllTodos, addTodo, updateTodo, deleteTodo };
