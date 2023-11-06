const { models } = require('../../../libs/sequelize');
const boom = require('@hapi/boom');

class MaquinaController {
  constructor() { }

  /*
    {
      data,
      empleados = []
    }
  */
  async add(data) {
    const newMaquina = await models.Maquina.create({
      ...data,
      createdAt: new Date().toLocaleString('es-ES', { timeZone: 'America/La_Paz' })
    });
    if (data.empleados != null) {
      for (let i = 0; i < data.empleados.length; i++) {
        await models.Empleado_maquina.create({
          ...data.empleados[i],
          maquinaId: newMaquina.id,
        });
      }
    }
    return newMaquina;
  }

  async edit(data, id) {
    const Maquina = await models.Maquina.findByPk(id);
    if (!Maquina) {
      throw boom.notFound('Maquina no encontrado');
    }
    const MaquinaUpdated = await Maquina.update({
      ...data,
    });
    const empleados = await models.Empleado_maquina.findAll({ where: { maquinaId: Maquina.id } });
    for (let i = 0; i < empleados.length; i++) {
      await empleados[i].destroy();
    }
    if (data.empleados != null) {
      for (let i = 0; i < data.empleados.length; i++) {
        await models.Empleado_maquina.create({
          ...data.empleados[i],
          maquinaId: Maquina.id,
        });
      }
    }
    return MaquinaUpdated;
  }

  async delete(id) {
    const Maquina = await models.Maquina.findByPk(id);
    if (!Maquina) {
      throw boom.notFound('Maquina no encontrado');
    }
    const empleados = await models.Empleado_maquina.findAll({ where: { maquinaId: Maquina.id } });
    for (let i = 0; i < empleados.length; i++) {
      await empleados[i].destroy();
    }
    await Maquina.destroy();
    return id;
  }

  async find(id) {
    const Maquina = await models.Maquina.findByPk(id);
    if (!Maquina) {
      throw boom.notFound('Maquina no encontrado');
    }
    const empleados = await models.Empleado_maquina.findAll({ where: { maquinaId: id }, include: ['empleado'] });
    return {
      ...Maquina.dataValues,
      empleados
    }
  };

  async getAll() {
    const Maquinas = await models.Maquina.findAll();
    let response = [];
    for (let i = 0; i < Maquinas.length; i++) {
      const empleados = await models.Empleado_maquina.findAll({ where: { maquinaId: Maquinas[i].id }, include: ['empleado'] });
      response.push({
        ...Maquinas[i].dataValues,
        empleados
      });
    }
    return response;
  }
}

module.exports = MaquinaController;
