const validator = require('joi');

// List of atributes for user model
const id = validator.number().integer();
const nombre = validator.string();
const stock = validator.number().integer();
const stockMinimo = validator.number().integer();
const fechaVencimiento = validator.date();
const sectorId = validator.number().integer();
const unidadId = validator.number().integer();


const addSchema = validator.object({
  nombre: nombre.required(),
  stock: stock.required(),
  stockMinimo: stockMinimo.required(),
  fechaVencimiento: fechaVencimiento.required(),
  sectorId: sectorId.required(),
  unidadId: unidadId.required()
});

const editSchema = validator.object({
  nombre: nombre,
  stock: stock,
  stockMinimo: stockMinimo,
  fechaVencimiento: fechaVencimiento,
  sectorId: sectorId,
  unidadId: unidadId
});

const getSchema = validator.object({
  id: id.required()
});

module.exports = { addSchema, editSchema, getSchema };
