const express = require('express');
const dotenv = require('dotenv');
const TaskModel = require('./src/models/task.model');

const connectToDatabase = require('./src/database/mongoose.database');


dotenv.config();
const app = express();
app.use(express.json());//permite que o express entenda requisições no formato json

connectToDatabase();//chama a função connectToDatabase para conectar ao banco de dados

app.get('/tasks', async (req, res) => {
   try{
       const tasks = await TaskModel.find({});
       res.send(tasks);
   }catch(error){
       res.status(500).send(error.message);
   }
});
app.get('/tasks/:id', async (req, res) => {
    try{
        const task = await TaskModel.findById(req.params.id);
        if(!task){
            res.status(404).send('Task not found');
        }
        res.send(task);
    }catch(error){
        res.status(500).send(error.message);
    }
});//busca uma task pelo id

app.post('/tasks', async (req, res) => {
   try{
       const task = new TaskModel(req.body);
       await task.save();
       res.status(201).send(task);
   }catch(error){
    res.status(400).send(error.message);
   }
});//cria uma nova task

app.patch('/tasks/:id', async (req, res) => {
    try{
        const taskId=req.params.id;
        const taskData=req.body;

        const taskUpdate = await TaskModel.findById(taskId);
        const allowedUpdates = ['isCompleted']; //campos que podem ser atualizados
        const requestUpdates = Object.keys(taskData);

        for(update of requestUpdates) {
            if(allowedUpdates.includes(update)){
                taskUpdate[update] = taskData[update];
            }
            else{
                return res.status(400).send({error: 'Invalid update!'});
            }
        }//atualiza os campos permitidos

        await taskUpdate.save();
        return res.status(200).send(taskUpdate);

    }catch(error){
        res.status(500).send(error.message);
    }
});//atualiza uma task

app.delete('/tasks/:id', async (req, res) => {
    try{
        const task = await TaskModel.findByIdAndDelete(req.params.id);
        if(!task){
            res.status(404).send('Task not found');
        }
        res.status(204).send(task);
    }catch(error){
        res.status(500).send(error.message);
    }
});//deleta uma task


app.listen(8000, () => console.log('Server is running on port 8000'));//listen faz a porta 8000 ficar aberta para receber requisições
    
