const joi = require("@hapi/joi");

exports.usersSchema = joi.object({
  name: joi
    .string()
    .required()
    .messages({ "any.required": "El nombre es requerido" }),
  surname: joi
    .string()
    .required()
    .messages({ "any.required": "El apellido es requerido" }),
  birthYear: joi
    .number()
    .required()
    .messages({ "any.required": "El año de nacimiento es requerido" }),
  image: joi
    .string()
    .required()
    .messages({ "any.required": "La imagen es requerida" }),
  email: joi
    .string()
    .required()
    .messages({ "any.required": "El email es requerido" }),
  id: joi.string().messages({ "any.required": "El id es requerido" }),
  username: joi
    .string()
    .messages({ "any.required": "El username es requerido" }),
});
