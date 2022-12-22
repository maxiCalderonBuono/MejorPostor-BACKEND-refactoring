const joi = require("@hapi/joi");

exports.usersSchema = joi.object({
  name: joi
    .string()
    .required()
    .messages({ "any.required": "Name is required" }),
  surname: joi
    .string()
    .required()
    .messages({ "any.required": "Surname is required" }),

  image: joi
    .string()
    .required()
    .messages({ "any.required": "Avatar is required" }),
  email: joi
    .string()
    .required()
    .messages({ "any.required": "Email is required" }),
  id: joi.string().messages({ "any.required": "El id es requerido" }),
  username: joi.string().messages({ "any.required": "Username is required" }),
});
