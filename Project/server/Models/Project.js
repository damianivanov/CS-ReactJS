const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 128,
    },
    managerId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        max: 4096
    },
    invitationCode: {
        type: String,
        default: uuidv4().substring(2, 8),
        unique: true,
        required: true
    },
    tasksId: {
        type: [String]
    },
    team: {
        type: [String]
    },
    deleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true,
    })

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;