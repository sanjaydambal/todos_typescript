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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getAllTodos = void 0;
const todoService = __importStar(require("../service/todoService"));
const getAllTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todoService.getAllTodos();
        return res.status(200).json(todos);
    }
    catch (error) {
        console.error('Error getting todos:', error);
        return res.status(500).json({ error: 'Failed to fetch todos' });
    }
});
exports.getAllTodos = getAllTodos;
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }
        const newTodo = yield todoService.addTodo({ title, description });
        return res.status(201).json(newTodo);
    }
    catch (error) {
        console.error('Error adding todo:', error);
        return res.status(500).json({ error: 'Failed to add todo' });
    }
});
exports.addTodo = addTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id);
        const { title, description } = req.body;
        const updatedTodo = yield todoService.updateTodo(parseInt(id), { title, description });
        console.log(updateTodo);
        if (!updatedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        return res.status(200).json(updatedTodo);
    }
    catch (error) {
        console.error('Error updating todo:', error);
        return res.status(500).json({ error: 'Failed to update todo' });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield todoService.deleteTodo(id);
        return res.status(204).send(); // No content
    }
    catch (error) {
        console.error('Error deleting todo:', error);
        return res.status(500).json({ error: 'Failed to delete todo' });
    }
});
exports.deleteTodo = deleteTodo;
