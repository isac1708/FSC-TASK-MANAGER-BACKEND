const express = require('express');
const router = express.Router();



const TaskController = require('../controllers/task.controller');

router.get('/', async (req, res) => {
   return new TaskController(req, res).getTasks();
 });//busca todas as tasks

 router.get('/:id', async (req, res) => {
       return new TaskController(req, res).getTaskById();
 });//busca uma task pelo id
 
 router.post('/', async (req, res) => {
       return new TaskController(req, res).createTask();
 });//cria uma nova task
 
 router.patch('/:id', async (req, res) => {
    return new TaskController(req, res).updateTask();
 });//atualiza uma task
 
 router.delete('/:id', async (req, res) => {
    return new TaskController(req, res).deleteTask();
 });//deleta uma task

module.exports = router;