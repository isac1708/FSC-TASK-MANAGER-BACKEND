const mongoose = require('mongoose');
// classe para criar modelos de dados

const TaskShema = mongoose.Schema({
    description:{
        type: String,
        required: true
    },
    isCompleted:{
        type: Boolean,
        default: false
    },
});

const TaskModel = mongoose.model('Task', TaskShema);// serve para criar a coleção no banco de dados

module.exports = TaskModel; // exporta o modelo para ser utilizado em outros arquivos