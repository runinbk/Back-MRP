const validator = require('joi');

// List of atributes for user model
const id = validator.number().integer();
const nombre = validator.string();
const abreviatura = validator.string();

const addSchema = validator.object({
  nombre: nombre.required(),
  abreviatura: abreviatura.required()
});

const editSchema = validator.object({
  nombre: nombre,
  abreviatura: abreviatura
});

const getSchema = validator.object({
  id: id.required()
});

module.exports = { addSchema, editSchema, getSchema };
