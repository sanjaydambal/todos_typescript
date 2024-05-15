"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getAllTodos = void 0;
const todoQueries = __importStar(require("../database/todoQueries"));
const config_1 = __importDefault(require("../database/config"));
const getAllTodos = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todosQueryResult = yield config_1.default.query(todoQueries.getAllTodos);
        const todos = todosQueryResult.rows;
        return todos;
    }
    catch (error) {
        throw new Error(`Error getting todos: ${error.message}`);
    }
});
exports.getAllTodos = getAllTodos;
const addTodo = (todo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = todo;
        if (!title) {
            throw new Error('Title is required');
        }
        const newTodoQueryResult = yield config_1.default.query(todoQueries.addTodo, [title, description]);
        const newTodo = newTodoQueryResult.rows[0];
        return newTodo;
    }
    catch (error) {
        throw new Error(`Error adding todo: ${error.message}`);
    }
});
exports.addTodo = addTodo;
const updateTodo = (id, todo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = todo;
        const todoId = id;
        if (!id) {
            throw new Error('Todo ID is required');
        }
        const updatedTodoQueryResult = yield config_1.default.query(todoQueries.updateTodo, [
            title,
            description,
            todoId,
        ]);
        if (updatedTodoQueryResult.rows.length === 0) {
            // Handle case where todo with given ID is not found
            throw new Error('Todo not found');
        }
        const updatedTodo = updatedTodoQueryResult.rows[0];
        console.log(updatedTodo);
        return updatedTodo;
    }
    catch (error) {
        throw new Error(`Error updating todo: ${error.message}`);
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!id) {
            throw new Error('Todo ID is required');
        }
        // Delete the todo from the database
        yield config_1.default.query(todoQueries.deleteTodo, [id]);
    }
    catch (error) {
        throw new Error(`Error deleting todo: ${error.message}`);
    }
});
exports.deleteTodo = deleteTodo;
