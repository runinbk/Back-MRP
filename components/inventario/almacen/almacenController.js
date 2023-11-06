const { models } = require('../../../libs/sequelize');
const boom = require('@hapi/boom');

class almacenController {
  constructor() { }

  async add(data) {
    const Almacen = await models.Almacen.create({
      ...data,
      createdAt: new Date().toLocaleString('es-ES', { timeZone: 'America/La_Paz' })
    });
    return Almacen;
  }

  async edit(data, id) {
    const Almacen = await models.Almacen.findByPk(id);
    if (!Almacen) {
      throw boom.notFound('Almacen no encontrado');
    }
    const AlmacenUpdated = await Almacen.update({
      ...data,
    });
    return AlmacenUpdated;
  }

  async delete(id) {
    const Almacen = await models.Almacen.findByPk(id);
    if (!Almacen) {
      throw boom.notFound('Almacen no encontrado');
    }
    await Almacen.destroy();
    return id;
  }

  async find(id) {
    const Almacen = await models.Almacen.findByPk(id);
    if (!Almacen) {
      throw boom.notFound('Almacen no encontrado');
    }
    return Almacen;
  }

  async getAll() {
    const Almacens = await models.Almacen.findAll();
    return Almacens;
  }
}

module.exports = almacenController;
