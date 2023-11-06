const { models } = require('../../../libs/sequelize');
const boom = require('@hapi/boom');

class stockController {
  constructor() { }

  async add(data) {
    const newstock = await models.Stock_diario.create({
      ...data,
      createdAt: new Date().toLocaleString('es-ES', { timeZone: 'America/La_Paz' })
    });
    return newstock;
  }

  async edit(data, id) {
    const stock = await models.Stock_diario.findByPk(id);
    if (!stock) {
      throw boom.notFound('stock no encontrado');
    }
    const stockUpdated = await stock.update({
      ...data,
    });
    return stockUpdated;
  }

  async delete(id) {
    const stock = await models.Stock_diario.findByPk(id, {
      include: ['producto']
    });
    if (!stock) {
      throw boom.notFound('stock no encontrado');
    }
    await stock.destroy();
    return id;
  }

  async find(id) {
    const stock = await models.Stock_diario.findByPk(id, {
      include: ['producto']
    });
    if (!stock) {
      throw boom.notFound('stock no encontrado');
    }
    return stock;
  }

  async getAll() {
    const stocks = await models.Stock_diario.findAll();
    return stocks;
  }
}

module.exports = stockController;
