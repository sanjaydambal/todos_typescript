"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getAllTodos = void 0;
exports.getAllTodos = 'select * from todos';
exports.addTodo = 'insert into todos (title,description) values($1,$2)';
exports.updateTodo = "UPDATE todos SET title = $1,description = $2 WHERE id = $3 RETURNING *";
exports.deleteTodo = 'delete from todos where id =$1';
