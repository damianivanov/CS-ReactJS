const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    fullname: Joi.string()
      .min(1)
      .required()
      .regex(/(\w.+\s).+/),
    username: Joi.string()
      .min(3)
      .required()
      .regex(/^[a-zA-Z]+$/),
    password: Joi.string()
      .min(6)
      .required()
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
    gender: Joi.number().required(),
  });
  return schema.validate(data);
};

const userValidation = (data) => {
  const schema = Joi.object({
    fullname: Joi.string()
      .min(1)
      .regex(/(\w.+\s).+/),
    username: Joi.string()
      .min(3)
      .regex(/^[a-zA-Z]+$/),
    password: Joi.string().min(6),
    gender: Joi.number(),
    role: Joi.string(),
    bio: Joi.string().max(512),
    photo: Joi.string(),
    status: Joi.string(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const recipeValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(80).required(),
    userId: Joi.string().min(24).max(24).optional(),
    ingredients: Joi.string().required(),
    description: Joi.string().required().max(2048),
    short_description: Joi.string().required().max(256),
    photo: Joi.string().uri(),
    time: Joi.number().positive().required(),
    keywords: Joi.array().required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.recipeValidation = recipeValidation;
module.exports.userValidation = userValidation;
