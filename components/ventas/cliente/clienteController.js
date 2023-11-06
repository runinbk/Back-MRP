const { models } = require('../../../libs/sequelize');
const boom = require('@hapi/boom');

class ClienteController {
  constructor() { }

  async add(data) {
    const newCliente = await models.Cliente.create({
      ...data,
      createdAt: new Date().toLocaleString('es-ES', { timeZone: 'America/La_Paz' })
    });
    return newCliente;
  }

  async edit(data, id) {
    const cliente = await models.Cliente.findByPk(id);
    if (!cliente) {
      throw boom.notFound('Cliente no encontrado');
    }
    const ClienteUpdated = await cliente.update({
      ...data,
    });
    return ClienteUpdated;
  }

  async delete(id) {
    const cliente = await models.Cliente.findByPk(id);
    if (!cliente) {
      throw boom.notFound('Cliente no encontrado');
    }
    await cliente.destroy();
    return id;
  }

  async find(id) {
    const cliente = await models.Cliente.findByPk(id);
    if (!cliente) {
      throw boom.notFound('Cliente no encontrado');
    }
    const pedidos = await models.Venta.findAll({ where: { clienteId: id } });
    let ventas = [];
    for (let i = 0; i < pedidos.length; i++) {
      const productos = await models.Detalle_venta.findAll({ where: { ventaId: pedidos[i].id }, include: ['producto'] });
      ventas.push({ ...pedidos[i].dataValues, productos });
    }
    return {
      ...cliente.dataValues,
      ventas
    };
  }

  async getAll() {
    const clientes = await models.Cliente.findAll();
    let response = [];
    for (let i = 0; i < clientes.length; i++) {
      const pedidos = await models.Venta.findAll({ where: { clienteId: clientes[i].id } });
      let ventas = [];
      for (let j = 0; j < pedidos.length; j++) {
        const productos = await models.Detalle_venta.findAll({ where: { ventaId: pedidos[j].id }, include: ['producto'] });
        ventas.push({ ...pedidos[j].dataValues, productos });
      }
      response.push({ ...clientes[i].dataValues, ventas });
    }
    return response;
  }
}

module.exports = ClienteController;
