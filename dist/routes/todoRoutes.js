"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoController_1 = require("../controller/todoController");
const router = express_1.default.Router();
router.route('/').get(todoController_1.getAllTodos).post(todoController_1.addTodo);
router.route('/:id').put(todoController_1.updateTodo).delete(todoController_1.deleteTodo);
exports.default = router;
