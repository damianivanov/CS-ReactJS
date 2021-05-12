const Joi = require('joi');

const registerValidation = data => {
    const schema = Joi.object({
        firstName: Joi.string().min(6),
        lastName: Joi.string().min(6),
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

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;