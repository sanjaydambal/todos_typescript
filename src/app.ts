import express from 'express';

import todoRoutes from './routes/todoRoutes';
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use('/todos', todoRoutes);



app.get('/', (req, res) => { 
    res.send('listening');
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})