const validator = require('joi');

// List of atributes for user model
const id = validator.number().integer();
const detalles = validator.string();
const fechaEntrega = validator.date();
const fechaPedido = validator.date();
const total = validator.number();
const clienteId = validator.number().integer();
const empleadoId = validator.number().integer();
const productos = validator.array().items(validator.object({
  productoId: validator.number().integer().required(),
  cantidad: validator.number().integer().required(),
  precio: validator.number().required()
}));

const addSchema = validator.object({
  detalles: detalles.required(),
  fechaEntrega: fechaEntrega.required(),
  fechaPedido: fechaPedido.required(),
  total: total.required(),
  clienteId: clienteId.required(),
  empleadoId: empleadoId.required(),
  productos: productos
});

const editSchema = validator.object({
  detalles: detalles,
  fechaEntrega: fechaEntrega,
  fechaPedido: fechaPedido,
  total: total,
  clienteId: clienteId,
  empleadoId: empleadoId,
  productos: productos
});

const getSchema = validator.object({
  id: id.required()
});

module.exports = { addSchema, editSchema, getSchema };
