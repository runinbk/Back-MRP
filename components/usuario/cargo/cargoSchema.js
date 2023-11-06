const validator = require('joi');

// List of atributes for user model
const id = validator.number().integer();
const nombre = validator.string();
const sueldo = validator.number();

const addSchema = validator.object({
  nombre: nombre.required(),
  sueldo: sueldo.required()
});

const editSchema = validator.object({
  nombre: nombre,
  sueldo: sueldo
});

const getSchema = validator.object({
  id: id.required()
});

module.exports = {
  addSchema,
  editSchema,
  getSchema
};
