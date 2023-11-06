const validator = require('joi');

// List of atributes for user model
const id = validator.number().integer();
const nombre = validator.string();
const apellido = validator.string();
const direccion = validator.string();
const telefono = validator.number().integer();

const addSchema = validator.object({
  nombre: nombre.required(),
  apellido: apellido.required(),
  direccion: direccion.required(),
  telefono: telefono.required()
});

const editSchema = validator.object({
  nombre: nombre,
  apellido: apellido,
  direccion: direccion,
  telefono: telefono
});

const getSchema = validator.object({
  id: id.required()
});

module.exports = { addSchema, editSchema, getSchema };
