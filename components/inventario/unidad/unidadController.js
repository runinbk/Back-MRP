const { models } = require('../../../libs/sequelize');
const boom = require('@hapi/boom');

class UnidadController {
  constructor() { }

  async add(data) {
    const Unidad_medida = await models.Unidad_medida.create({
      ...data,
      createdAt: new Date().toLocaleString('es-ES', { timeZone: 'America/La_Paz' })
    });
    return Unidad_medida;
  }

  async edit(data, id) {
    const Unidad_medida = await models.Unidad_medida.findByPk(id);
    if (!Unidad_medida) {
      throw boom.notFound('Unidad de medida no encontrado');
    }
    const Unidad_medidaUpdated = await Unidad_medida.update({
      ...data,
    });
    return Unidad_medidaUpdated;
  }

  async delete(id) {
    const Unidad_medida = await models.Unidad_medida.findByPk(id);
    if (!Unidad_medida) {
      throw boom.notFound('Unidad de medida no encontrado');
    }
    await Unidad_medida.destroy();
    return id;
  }

  async find(id) {
    const Unidad_medida = await models.Unidad_medida.findByPk(id);
    if (!Unidad_medida) {
      throw boom.notFound('Unidad de medida no encontrado');
    }
    return Unidad_medida;
  }

  async getAll() {
    const Unidad_medidas = await models.Unidad_medida.findAll();
    return Unidad_medidas;
  }
}

module.exports = UnidadController;
