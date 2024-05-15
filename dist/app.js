"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_1 = __importDefault(require("./swagger/swagger"));
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/todos', todoRoutes_1.default);
(0, swagger_1.default)(app);
// app.get('/', (req, res) => { 
//     res.send('listening');
// })
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
