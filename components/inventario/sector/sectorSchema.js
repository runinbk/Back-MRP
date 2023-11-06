const validator = require('joi');

// List of atributes for user model
const id = validator.number().integer();
const nombre = validator.string();
const almacenId = validator.number().integer();

const addSchema = validator.object({
  nombre: nombre.required(),
  almacenId: almacenId.required()
});

const editSchema = validator.object({
  nombre: nombre,
  almacenId: almacenId
});

const getSchema = validator.object({
  id: id.required()
});

module.exports = { addSchema, editSchema, getSchema };
