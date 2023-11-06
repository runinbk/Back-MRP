const validator = require('joi');

// List of atributes for user model
const id = validator.number().integer();
const fecha = validator.date();
const total = validator.number();
const empleadoId = validator.number().integer();

const materiales = validator.array().items(validator.object({
  cantidad: validator.number().integer().required(),
  precio: validator.number().required(),
  proveedorId: validator.number().integer(),
  unidadId: validator.number().integer(),
  materiaPrimaId: validator.number().integer(),
}));

const addSchema = validator.object({
  fecha: fecha.required(),
  total: total.required(),
  empleadoId: empleadoId.required(),
  materiales: materiales
});

const editSchema = validator.object({
  fecha: fecha,
  total: total,
  empleadoId: empleadoId,
  materiales: materiales
});

const getSchema = validator.object({
  id: id.required()
});

module.exports = { addSchema, editSchema, getSchema };
