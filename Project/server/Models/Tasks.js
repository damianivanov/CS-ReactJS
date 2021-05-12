const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const taskSchema = new mongoose.Schema({
    taskId:{
        type: String,
        reuqired: true,
        default: uuidv4(),
        unique: true
    },
    projectId:{
        type: String,
        reuqired: true,
    },
    assignorId:{
        type: String,
        required: true,
    },
    assigneeId:{
        type: String,
        reuqired: true,
    },
    label: { 
        type: String,
        max: 256
    },
    description:{
        type: String,
        max: 4096
    },
    status: {
        type: String,
        required: true,
    },
    subTasks:{
        type: [Task]
    },
    taskResult:{
        type: String
    },
    startDate:{
        type:Date,
        default: Date.now(),
    },
    dueDate:{
        type: Date
    }
},
{
    timestamps: true,
})

const Task = mongoose.model('Task', taskShema);
module.exports = Task;