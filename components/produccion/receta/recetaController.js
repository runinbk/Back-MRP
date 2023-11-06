const { models } = require('../../../libs/sequelize');
const boom = require('@hapi/boom');

class RecetaController {
  constructor() { }
  /*
    {
      data,
      ingredientes : []
    }
  */
  async add(data) {
    const newReceta = await models.Receta.create({
      ...data,
      createdAt: new Date().toLocaleString('es-ES', { timeZone: 'America/La_Paz' })
    });
    if (data.ingredientes != null) {
      for (let i = 0; i < data.ingredientes.length; i++) {
        await models.Ingredientes.create({
          ...data.ingredientes[i],
          recetaId: newReceta.id,
        });
      }
    }
    return newReceta;
  }

  async edit(data, id) {
    const Receta = await models.Receta.findByPk(id);
    if (!Receta) {
      throw boom.notFound('Receta no encontrado');
    }
    const RecetaUpdated = await Receta.update({
      ...data,
    });
    const ingredientes = await models.Ingredientes.findAll({ where: { recetaId: id } });
    for (let i = 0; i < ingredientes.length; i++) {
      await ingredientes[i].destroy();
    }
    if (data.ingredientes != null) {
      for (let i = 0; i < data.ingredientes.length; i++) {
        await models.Ingredientes.create({
          ...data.ingredientes[i],
          recetaId: id,
        });
      }
    }
    return RecetaUpdated;
  }

  async delete(id) {
    const Receta = await models.Receta.findByPk(id);
    if (!Receta) {
      throw boom.notFound('Receta no encontrado');
    }
    const ingredientes = await models.Ingredientes.findAll({ where: { recetaId: id } });
    for (let i = 0; i < ingredientes.length; i++) {
      await ingredientes[i].destroy();
    }
    await Receta.destroy();
    return id;
  }

  async find(id) {
    const Receta = await models.Receta.findByPk(id, { include: ['producto'] });
    if (!Receta) {
      throw boom.notFound('Receta no encontrado');
    }
    const ingredientes = await models.Ingredientes.findAll({ where: { recetaId: id }, include: ['materia_prima'] });
    return {
      ...Receta.dataValues,
      ingredientes
    }
  };

  async getAll() {
    const Recetas = await models.Receta.findAll({ include: ['producto'] });
    let response = [];
    for (let i = 0; i < Recetas.length; i++) {
      const ingredientes = await models.Ingredientes.findAll({ where: { recetaId: Recetas[i].id }, include: ['materia_prima'] });
      response.push({
        ...Recetas[i].dataValues,
        ingredientes
      });
    }
    return response;
  }
}

module.exports = RecetaController;
