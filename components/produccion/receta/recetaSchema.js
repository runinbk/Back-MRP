const validator = require('joi');

// List of atributes for user model
const id = validator.number().integer();
const nombre = validator.string();
const descripcion = validator.string();
const productoId = validator.number().integer();

const ingredientes = validator.array().items(validator.object({
  cantidad: validator.number().integer().required(),
  materiaPrimaId: validator.number().integer(),
}));

const addSchema = validator.object({
  nombre: nombre.required(),
  descripcion: descripcion.required(),
  productoId: productoId.required(),
  ingredientes: ingredientes
});

const editSchema = validator.object({
  nombre: nombre,
  descripcion: descripcion,
  productoId: productoId,
  ingredientes: ingredientes
});

const getSchema = validator.object({
  id: id.required()
});

module.exports = {
  addSchema,
  editSchema,
  getSchema
};
