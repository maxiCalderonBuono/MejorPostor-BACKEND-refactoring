const joi = require("@hapi/joi");

exports.productSchema = joi.object({
  name: joi
    .string()
    .required()
    .messages({ "any.required": "El nombre es requerido" }),
  image: joi
    .string()
    .required()
    .messages({ "any.required": "La imagen es requerida" }),
  description: joi
    .string()
    .required()
    .messages({ "any.required": "La descripción es requerida" }),
  location: joi
    .string()
    .required()
    .messages({ "any.required": "La ubicación es requerida" }),
  initialPrice: joi
    .number()
    .required()
    .messages({ "any.required": "El precio inicial es requerido" }),
  category: joi
    .string()
    .required()
    .messages({ "any.required": "La categoría es requerida" }),
  duration: joi
    .date()
    .required()
    .messages({ "any.required": "La duración es requerida" }),
  id: joi
    .string()
    .required()
    .messages({ "any.required": "El id es requerido" }),
  highestBid: joi
    .number()
    .messages({ "any.required": "El precio más alto es requerido" }),
  bidUser: joi.string().messages({
    "any.required": "El usuario que ofrece el precio más alto es requerido",
  }),
  userId: joi
    .string()
    .messages({ "any.required": "El id del usuario es requerido" }),
});
