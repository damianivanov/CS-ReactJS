const Joi = require('joi');
const Project = require('./Models/Project');

const registerValidation = data => {
    const schema = Joi.object({
        firstName: Joi.string().min(1),
        lastName: Joi.string().min(1),
        username: Joi.string().min(3).required(),
        email: Joi.string().email().lowercase().required().min(6),
        password: Joi.string().min(6).required(),
        role: Joi.string().required(),
    });
    return schema.validate(data);
}

const loginValidation = data => {
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
}
const projectValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        managerId: Joi.string().min(36).max(36).required(),
        description: Joi.string().optional(),
        tasksId: Joi.array().items(Joi.string().min(36).max(36)).optional(),
        team: Joi.array().items(Joi.string().min(36).max(36)).optional(),
    });
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.projectValidation = projectValidation;