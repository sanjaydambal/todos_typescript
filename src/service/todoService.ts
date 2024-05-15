import { Pool, QueryResult } from 'pg';
import * as todoQueries from '../database/todoQueries';
import pool from '../database/config';
import { TodoInterface,AddTodoInterface } from '../models/todoInterface';
const getAllTodos = async (): Promise<TodoInterface[]> => {
    try {
        const todosQueryResult: QueryResult = await pool.query(todoQueries.getAllTodos);
        const todos: TodoInterface[] = todosQueryResult.rows;
        return todos;
    } catch (error) {
        throw new Error(`Error getting todos: ${(error as Error).message}`);
    }
};

const addTodo = async (todo: AddTodoInterface): Promise<TodoInterface> => {
    try {
        const { title, description,completed } = todo;

        
        if (!title) {
            throw new Error('Title is required');
        }

        const newTodoQueryResult: QueryResult = await pool.query(todoQueries.addTodo, [title, description,completed]);
        const newTodo: TodoInterface = newTodoQueryResult.rows[0];
        return newTodo;
    } catch (error) {
        throw new Error(`Error adding todo: ${(error as Error).message}`);
    }
};

const updateTodo = async (id: number, todo: AddTodoInterface): Promise<TodoInterface | null> => {
    try {
        const { title,description,completed } = todo;
        const todoId = id;

        if (!id) {
            throw new Error('Todo ID is required');
        }

        const updatedTodoQueryResult: QueryResult = await pool.query(todoQueries.updateTodo, [
            title,
            description,
            todoId,
            completed
        ]);

        if (updatedTodoQueryResult.rows.length === 0) {
            // Handle case where todo with given ID is not found
            throw new Error('Todo not found');
        }

        const updatedTodo: TodoInterface | null = updatedTodoQueryResult.rows[0];
        console.log(updatedTodo);
        return updatedTodo;
    } catch (error) {
        throw new Error(`Error updating todo: ${(error as Error).message}`);
    }
};


const deleteTodo = async (id: string): Promise<void> => {
    try {
        if (!id) {
            throw new Error('Todo ID is required');
        }

        // Delete the todo from the database
        await pool.query(todoQueries.deleteTodo, [id]);
    } catch (error) {
        throw new Error(`Error deleting todo: ${(error as Error).message}`);
    }
};

export { getAllTodos, addTodo, updateTodo, deleteTodo };
