const express = require('express');
const dotenv = require('dotenv');

const connectToDatabase = require('./src/database/mongoose.database');


dotenv.config();
const app = express();

connectToDatabase();//chama a função connectToDatabase para conectar ao banco de dados

app.get('/tasks', (req, res) => {
    const tasks= [{description : "Estudar Programação", isCompleted : false}];
    res.status(200).send(tasks);
});
app.listen(8000, () => console.log('Server is running on port 8000'));//listen faz a porta 8000 ficar aberta para receber requisições
    
