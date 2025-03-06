const TaskModel = require('../models/task.model');

class TaskController{

    constructor(req,res){
        this.req = req;
        this.res = res;
    }

    async getTasks(req, res) {
        try{
            const tasks = await TaskModel.find({});
            this.res.status(200).send(tasks);
        }catch(error){
            this.res.status(500).send(error.message);
        }
    }

    async getTaskById(req,res){
        try{
            const task = await TaskModel.findById(req.params.id);
            if(!task){
                this.res.status(404).send('Task not found');
            }
            this.res.send(task);
        }catch(error){
            this.res.status(500).send(error.message);
        }
    }

    async createTask(req,res){
        try{
            const task = new TaskModel(req.body);
            await task.save();
            this.res.status(201).send(task);
        }catch(error){
            this.res.status(400).send(error.message);
        }
    }

    async updateTask(req,res){
        try{
            const taskId= this.req.params.id;
            const taskData= this.req.body;
    
            const taskUpdate = await TaskModel.findById(taskId);
            const allowedUpdates = ['isCompleted']; //campos que podem ser atualizados
            const requestUpdates = Object.keys(taskData);
    
            for(const update of requestUpdates) {
                if(allowedUpdates.includes(update)){
                    taskUpdate[update] = taskData[update];
                }
                else{
                    return this.res.status(400).send({error: 'Invalid update!'});
                }
            }//atualiza os campos permitidos
    
            await taskUpdate.save();
            return this.res.status(200).send(taskUpdate);
    
        }catch(error){
            this.res.status(500).send(error.message);
        }
    }

    async deleteTask(req,res){
        try{
            const task = await TaskModel.findByIdAndDelete(this.req.params.id);
            if(!task){
                this.res.status(404).send('Task not found');
            }
            this.res.status(204).send(task);
        }catch(error){
            this.res.status(500).send(error.message);
        }
    }

}



module.exports = TaskController;