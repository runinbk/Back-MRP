const validator = require('joi');

// List of atributes for user model
const id = validator.number().integer();
const cantidad = validator.number();
const estado = validator.string();
const fecha = validator.date();
const productoId = validator.number().integer();

const addSchema = validator.object({
  cantidad: cantidad.required(),
  estado: estado.required(),
  fecha: fecha.required(),
  productoId: productoId.required()
});

const editSchema = validator.object({
  cantidad: cantidad,
  estado: estado,
  fecha: fecha,
  productoId: productoId
});

const getSchema = validator.object({
  id: id.required()
});

module.exports = { addSchema, editSchema, getSchema };
