const Joi = require('joi');
const Project = require('./Models/Project');

const registerValidation = data => {
    const schema = Joi.object({
        firstName: Joi.string().min(1).required(),
        lastName: Joi.string().min(1).required(),
        username: Joi.string().min(3).required(),
        email: Joi.string().email().lowercase().required().min(6),
        password: Joi.regex( /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).required(),
        role: Joi.string(),
        gender: Joi.number().valid(1,0).required(),
        photo: Joi.uri(),
    });
    return schema.validate(data);
}

const loginValidation = data => {
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        password: Joi.regex( /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).required()
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