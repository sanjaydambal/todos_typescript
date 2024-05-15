import express from 'express';
import swaggerSetup from './swagger/swagger'
import todoRoutes from './routes/todoRoutes';
const app = express();
import cors from 'cors'
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors())
app.use('/todos', todoRoutes);

swaggerSetup(app)

app.get('/health', (req, res) => { 
    res.send('listening');
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})