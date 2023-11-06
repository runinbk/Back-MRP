const { models } = require('../../../libs/sequelize');
const boom = require('@hapi/boom');

class EmpleadoController {
  constructor() { }

  async add(data) {
    const newEmpleado = await models.Empleado.create({
      ...data,
      createdAt: new Date().toLocaleString('es-ES', { timeZone: 'America/La_Paz' })
    });
    return newEmpleado;
  }

  async edit(data, id) {
    const Empleado = await models.Empleado.findByPk(id);
    if (!Empleado) {
      throw boom.notFound('Empleado no encontrado');
    }
    const EmpleadoUpdated = await Empleado.update({
      ...data,
    });
    return EmpleadoUpdated;
  }

  async delete(id) {
    const Empleado = await models.Empleado.findByPk(id);
    if (!Empleado) {
      throw boom.notFound('Empleado no encontrado');
    }
    await Empleado.destroy();
    return id;
  }

  async find(id) {
    const Empleado = await models.Empleado.findByPk(id, {
      include: ['user', 'cargo'],
    });
    if (!Empleado) {
      throw boom.notFound('Empleado no encontrado');
    }
    delete Empleado.user.dataValues.password;
    delete Empleado.user.dataValues.recoveryToken;
    return Empleado;
  }

  async getAll() {
    const Empleados = await models.Empleado.findAll({
      include: ['user', 'cargo'],
    });
    // eliminar password del capo user
    Empleados.forEach((Empleado) => {
      delete Empleado.user.dataValues.password;
      delete Empleado.user.dataValues.recoveryToken;
    });
    return Empleados;
  }
}

module.exports = EmpleadoController;
