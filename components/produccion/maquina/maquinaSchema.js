const validator = require('joi');

// List of atributes for user model
const id = validator.number().integer();
const nombre = validator.string();
const estado = validator.string();
const capacidad = validator.number().integer();
const procesoId = validator.number().integer();

const empleados = validator.array().items(validator.object({
  estadoEmpleado: validator.string(),
  empleadoId: validator.number().integer(),
}));


const addSchema = validator.object({
  nombre: nombre.required(),
  estado: estado.required(),
  capacidad: capacidad.required(),
  procesoId: procesoId.required(),
  empleados: empleados
});

const editSchema = validator.object({
  nombre: nombre,
  estado: estado,
  capacidad: capacidad,
  procesoId: procesoId,
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
