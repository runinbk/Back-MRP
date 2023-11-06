const { models } = require('../../../libs/sequelize');
const boom = require('@hapi/boom');

class SectorController {
  constructor() { }

  async add(data) {
    const Sector = await models.Sector.create({
      ...data,
      createdAt: new Date().toLocaleString('es-ES', { timeZone: 'America/La_Paz' })
    });
    return Sector;
  }

  async edit(data, id) {
    const Sector = await models.Sector.findByPk(id);
    if (!Sector) {
      throw boom.notFound('Sector no encontrado');
    }
    const SectorUpdated = await Sector.update({
      ...data,
    });
    return SectorUpdated;
  }

  async delete(id) {
    const Sector = await models.Sector.findByPk(id);
    if (!Sector) {
      throw boom.notFound('Sector no encontrado');
    }
    await Sector.destroy();
    return id;
  }

  async find(id) {
    const Sector = await models.Sector.findByPk(id, {
      include: ['almacen'],
    });
    if (!Sector) {
      throw boom.notFound('Sector no encontrado');
    }
    return Sector;
  }

  async getAll() {
    const Sectors = await models.Sector.findAll({
      include: ['almacen'],
    });
    return Sectors;
  }
}

module.exports = SectorController;
