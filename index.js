const express = require('express');
const dotenv = require('dotenv');
const TaskModel = require('./src/models/task.model');
const taskRouter = require('./src/routes/task.routes');

const connectToDatabase = require('./src/database/mongoose.database');


dotenv.config();
const app = express();
app.use(express.json());//permite que o express entenda requisições no formato json

connectToDatabase();//chama a função connectToDatabase para conectar ao banco de dados

app.use("/tasks", taskRouter);//usa o taskRouter para lidar com as requisições que chegam na rota /tasks


app.listen(8000, () => console.log('Server is running on port 8000'));//listen faz a porta 8000 ficar aberta para receber requisições
    
