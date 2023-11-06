const validator = require('joi');

// List of atributes for user model
const id = validator.number().integer();
const nombre = validator.string();
const ubicacion = validator.string();

const addSchema = validator.object({
  nombre: nombre.required(),
  ubicacion: ubicacion.required()
});

const editSchema = validator.object({
  nombre: nombre,
  ubicacion: ubicacion
});

const getSchema = validator.object({
  id: id.required()
});

module.exports = { addSchema, editSchema, getSchema };
