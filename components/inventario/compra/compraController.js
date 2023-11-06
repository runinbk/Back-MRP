const { models } = require('../../../libs/sequelize');
const boom = require('@hapi/boom');

class CompraController {
  constructor() { }

  async add(data) {
    const Compra = await models.Compra.create({
      ...data,
      createdAt: new Date().toLocaleString('es-ES', { timeZone: 'America/La_Paz' })
    });
    if (data.materiales != null) {
      for (let i = 0; i < data.materiales.length; i++) {
        const material = data.materiales[i];
        await models.Detalle_compra.create({
          ...material,
          notaCompraId: Compra.id,
          createdAt: new Date().toLocaleString('es-ES', { timeZone: 'America/La_Paz' })
        });
      }
    }

    return Compra;
  }

  async edit(data, id) {
    const Compra = await models.Compra.findByPk(id);
    if (!Compra) {
      throw boom.notFound('Compra no encontrado');
    }
    const CompraUpdated = await Compra.update({
      ...data,
    });
    const detalles = await models.Detalle_compra.findAll({
      where: {
        notaCompraId: id
      }
    });
    for (let i = 0; i < detalles.length; i++) {
      const detalle = detalles[i];
      await detalle.destroy();
    }
    if (data.materiales != null) {
      for (let i = 0; i < data.materiales.length; i++) {
        const material = data.materiales[i];
        await models.Detalle_compra.create({
          ...material,
          notaCompraId: Compra.id,
          createdAt: new Date().toLocaleString('es-ES', { timeZone: 'America/La_Paz' })
        });
      }
    }
    return CompraUpdated;
  }

  async delete(id) {
    const Compra = await models.Compra.findByPk(id);
    if (!Compra) {
      throw boom.notFound('Compra no encontrado');
    }
    await Compra.destroy();
    return id;
  }

  async find(id) {
    const Compra = await models.Compra.findByPk(id, {
      include: ['empleado'],
    });
    if (!Compra) {
      throw boom.notFound('Compra no encontrado');
    }
    const detalles = await models.Detalle_compra.findAll({ where: { notaCompraId: id } });
    const responde = {
      ...Compra.dataValues,
      materiales: detalles
    }
    return responde;
  }

  async getAll() {
    const Compras = await models.Compra.findAll({
      include: ['empleado'],
    });
    let response = [];
    for (let i = 0; i < Compras.length; i++) {
      const Compra = Compras[i];
      const detalles = await models.Detalle_compra.findAll({
        where: {
          notaCompraId: Compra.id
        }
      });
      const res = {
        ...Compra.dataValues,
        materiales: detalles
      }
      response.push(res);
    }
    return response;
  }
}

module.exports = CompraController;
