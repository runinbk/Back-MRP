const validator = require('joi');

// List of atributes for user model
const id = validator.number().integer();
const nombre = validator.string();
const apellido = validator.string();
const direccion = validator.string();
const sexo = validator.string();
const ci = validator.number();
const userId = validator.number().integer();
const cargoId = validator.number().integer();

const addSchema = validator.object({
  nombre: nombre.required(),
  apellido: apellido.required(),
  direccion: direccion.required(),
  sexo: sexo.required(),
  ci: ci.required(),
  userId: userId.required(),
  cargoId: cargoId.required()
});

const editSchema = validator.object({
  nombre: nombre,
  apellido: apellido,
  direccion: direccion,
  sexo: sexo,
  ci: ci,
  userId: userId,
  cargoId: cargoId
});

const getSchema = validator.object({
  id: id.required()
});

module.exports = {
  addSchema,
  editSchema,
  getSchema
};
