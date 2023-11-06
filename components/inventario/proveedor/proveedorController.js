const { models } = require('../../../libs/sequelize');
const boom = require('@hapi/boom');

class ProveedorController {
  constructor() { }

  async add(data) {
    const Proveedor = await models.Proveedor.create({
      ...data,
      createdAt: new Date().toLocaleString('es-ES', { timeZone: 'America/La_Paz' })
    });
    return Proveedor;
  }

  async edit(data, id) {
    const Proveedor = await models.Proveedor.findByPk(id);
    if (!Proveedor) {
      throw boom.notFound('Proveedor no encontrado');
    }
    const ProveedorUpdated = await Proveedor.update({
      ...data,
    });
    return ProveedorUpdated;
  }

  async delete(id) {
    const Proveedor = await models.Proveedor.findByPk(id);
    if (!Proveedor) {
      throw boom.notFound('Proveedor no encontrado');
    }
    await Proveedor.destroy();
    return id;
  }

  async find(id) {
    const Proveedor = await models.Proveedor.findByPk(id);
    if (!Proveedor) {
      throw boom.notFound('Proveedor no encontrado');
    }
    return Proveedor;
  }

  async getAll() {
    const Proveedors = await models.Proveedor.findAll();
    return Proveedors;
  }
}

module.exports = ProveedorController;
