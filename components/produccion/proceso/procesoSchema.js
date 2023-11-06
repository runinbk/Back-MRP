const validator = require('joi');

// List of atributes for user model
const id = validator.number().integer();
const nombre = validator.string();
const descripcion = validator.string();
const tiempo = validator.number();

const productos = validator.array().items(validator.object({
  productoId: validator.number().integer(),
}));

const empleados = validator.array().items(validator.object({
  estadoEmpleado: validator.boolean(),
  cantidad: validator.number().integer(),
  empleadoId: validator.number().integer(),
}));

const addSchema = validator.object({
  nombre: nombre.required(),
  descripcion: descripcion.required(),
  tiempo: tiempo.required(),
  productos: productos,
  empleados: empleados
});

const editSchema = validator.object({
  nombre: nombre,
  descripcion: descripcion,
  tiempo: tiempo,
  productos: productos,
  empleados: empleados
});

const getSchema = validator.object({
  id: id.required()
});

module.exports = {
  addSchema,
  editSchema,
  getSchema
};
