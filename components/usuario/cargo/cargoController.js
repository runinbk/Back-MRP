const { models } = require('../../../libs/sequelize');
const boom = require('@hapi/boom');

class CargoController {
  constructor() { }

  async add(data) {
    const newCargo = await models.Cargo.create({
      ...data,
      createdAt: new Date().toLocaleString('es-ES', { timeZone: 'America/La_Paz' })
    });
    return newCargo;
  }

  async edit(data, id) {
    const cargo = await models.Cargo.findByPk(id);
    if (!cargo) {
      throw boom.notFound('Cargo no encontrado');
    }
    const cargoUpdated = await cargo.update({
      ...data,
    });
    return cargoUpdated;
  }

  async delete(id) {
    const cargo = await models.Cargo.findByPk(id);
    if (!cargo) {
      throw boom.notFound('Cargo no encontrado');
    }
    await cargo.destroy();
    return id;
  }

  async find(id) {
    const cargo = await models.Cargo.findByPk(id);
    if (!cargo) {
      throw boom.notFound('Cargo no encontrado');
    }
    return cargo;
  }

  async getAll() {
    const cargos = await models.Cargo.findAll();
    return cargos;
  }
}

module.exports = CargoController;
