const { models } = require('../../../libs/sequelize');
const boom = require('@hapi/boom');

class ProductoController {
  constructor() { }

  /*
    Estructura de data:
    {
      ...data,
      productos: [
        {
          productoId: 1,
          cantidad: 10,
          precio: 100
        }
      ]
  */
  async add(data) {
    const newPedido = await models.Venta.create({
      ...data,
      createdAt: new Date().toLocaleString('es-ES', { timeZone: 'America/La_Paz' })
    });
    if (data.productos != null) {
      for (let i = 0; i < data.productos.length; i++) {
        await models.Detalle_venta.create({
          ...data.productos[i],
          ventaId: newPedido.id
        });
      }
    }
    return newPedido;
  }

  async edit(data, id) {
    const pedido = await models.Venta.findByPk(id);
    if (!pedido) {
      throw boom.notFound('Pedido no encontrado');
    }
    const pedidoUpdated = await pedido.update({
      ...data,
    });
    const detalles = await models.Detalle_venta.findAll({ where: { ventaId: id } });
    for (let i = 0; i < detalles.length; i++) {
      await detalles[i].destroy();
    }
    if (data.productos != null) {
      for (let i = 0; i < data.productos.length; i++) {
        await models.Detalle_venta.create({
          ...data.productos[i],
          ventaId: pedido.id
        });
      }
    }
    return pedidoUpdated;
  }

  async delete(id) {
    const Pedido = await models.Venta.findByPk(id);
    if (!Pedido) {
      throw boom.notFound('Pedido no encontrado');
    }
    const detalles = await models.Detalle_venta.findAll({ where: { ventaId: id } });
    for (let i = 0; i < detalles.length; i++) {
      await detalles[i].destroy();
    }
    await Pedido.destroy();
    return id;
  }

  async find(id) {
    const Pedido = await models.Venta.findByPk(id, {
      include: ['cliente', 'empleado']
    });
    if (!Pedido) {
      throw boom.notFound('Pedido no encontrado');
    }
    const productos = await models.Detalle_venta.findAll({ where: { ventaId: id }, include: ['producto'] });
    return {
      ...Pedido.dataValues,
      productos
    }
  }

  async getAll() {
    const pedidos = await models.Venta.findAll({ include: ['cliente', 'empleado'] });
    let response = [];
    for (let i = 0; i < pedidos.length; i++) {
      const productos = await models.Detalle_venta.findAll({ where: { ventaId: pedidos[i].id }, include: ['producto'] });
      response.push({
        ...pedidos[i].dataValues,
        productos
      });
    }
    return response;
  }
}

module.exports = ProductoController;
