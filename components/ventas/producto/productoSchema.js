const validator = require('joi');

// List of atributes for user model
const id = validator.number().integer();
const nombre = validator.string();
const descripcion = validator.string();
const precio = validator.number();

const addSchema = validator.object({
  nombre: nombre.required(),
  descripcion: descripcion.required(),
  precio: precio.required()
});

const editSchema = validator.object({
  nombre: nombre,
  descripcion: descripcion,
  precio: precio
});

const getSchema = validator.object({
  id: id.required()
});

module.exports = { addSchema, editSchema, getSchema };
