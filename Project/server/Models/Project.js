const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    managerId: {
        type: String.prototype,
        required: true
    },
    projectId: {
        type: String,
        reuqired: true,
        unique: true
    },
    description: {
        type: String,
        max: 4096
    },
    invitationCode: {
        type: String,
        default: projectId.substring(2, 8),
        unique: true,
        required: true
    },
    tasksId: {
        type: [String]
    },
    team: {
        type: [String]
    }
},
    {
        timestamps: true,
    })

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;