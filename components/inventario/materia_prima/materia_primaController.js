const { models } = require('../../../libs/sequelize');
const boom = require('@hapi/boom');

class Materia_primaController {
  constructor() { }

  async add(data) {
    const Materia_prima = await models.Materia_prima.create({
      ...data,
      createdAt: new Date().toLocaleString('es-ES', { timeZone: 'America/La_Paz' })
    });
    return Materia_prima;
  }

  async edit(data, id) {
    const Materia_prima = await models.Materia_prima.findByPk(id);
    if (!Materia_prima) {
      throw boom.notFound('Materia prima no encontrado');
    }
    const Materia_primaUpdated = await Materia_prima.update({
      ...data,
    });
    return Materia_primaUpdated;
  }

  async delete(id) {
    const Materia_prima = await models.Materia_prima.findByPk(id);
    if (!Materia_prima) {
      throw boom.notFound('Materia prima no encontrado');
    }
    await Materia_prima.destroy();
    return id;
  }

  async find(id) {
    const Materia_prima = await models.Materia_prima.findByPk(id, {
      include: ['sector', 'unidad'],
    });
    if (!Materia_prima) {
      throw boom.notFound('Materia prima no encontrado');
    }
    return Materia_prima;
  }

  async getAll() {
    const Materia_primas = await models.Materia_prima.findAll({
      include: ['sector', 'unidad'],
    });
    return Materia_primas;
  }
}

module.exports = Materia_primaController;
