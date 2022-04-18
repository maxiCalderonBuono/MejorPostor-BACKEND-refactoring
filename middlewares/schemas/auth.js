const joi = require("@hapi/joi");

exports.signUpSchema = joi.object({
  username: joi
    .string()
    .required()
    .messages({ "any.required": "El nombre de usuario es requerido" }),
  password: joi
    .string()
    .required()
    .messages({ "any.required": "La contraseña es requerida" }),
  email: joi
    .string()
    .required()
    .messages({ "any.required": "El email es requerido" }),
});

exports.signInSchema = joi.object({
  username: joi
    .string()
    .required()
    .messages({ "any.required": "El nombre de usuario es requerido" }),
  password: joi
    .string()
    .required()
    .messages({ "any.required": "La contraseña es requerida" }),
  email: joi
    .string()
    .required()
    .messages({ "any.required": "El email es requerido" }),
});
