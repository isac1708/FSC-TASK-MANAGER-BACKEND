const express = require('express');
const router = express.Router();


const TaskModel = require('../models/task.model');
const TaskController = require('../controllers/task.controller');

router.get('/', async (req, res) => {
   return TaskController.getTasks(req, res);
 });

 router.get('/:id', async (req, res) => {
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
 
 router.post('/', async (req, res) => {
    try{
        const task = new TaskModel(req.body);
        await task.save();
        res.status(201).send(task);
    }catch(error){
     res.status(400).send(error.message);
    }
 });//cria uma nova task
 
 router.patch('/:id', async (req, res) => {
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
 
 router.delete('/:id', async (req, res) => {
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

module.exports = router;