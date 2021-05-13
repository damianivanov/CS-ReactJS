const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const id = uuidv4();
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 128,
    },
    managerId: {
        type: String.prototype,
        required: true
    },
    projectId: {
        type: String,
        reuqired: true,
        default: id,
        unique: true
    },
    description: {
        type: String,
        max: 4096
    },
    invitationCode: {
        type: String,
        default: id.substring(2, 8),
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