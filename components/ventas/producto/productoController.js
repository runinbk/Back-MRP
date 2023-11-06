const { models } = require('../../../libs/sequelize');
const boom = require('@hapi/boom');

class ProductoController {
  constructor() { }

  async add(data) {
    const newProducto = await models.Producto.create({
      ...data,
      createdAt: new Date().toLocaleString('es-ES', { timeZone: 'America/La_Paz' })
    });
    return newProducto;
  }

  async edit(data, id) {
    const Producto = await models.Producto.findByPk(id);
    if (!Producto) {
      throw boom.notFound('Producto no encontrado');
    }
    const ProductoUpdated = await Producto.update({
      ...data,
    });
    return ProductoUpdated;
  }

  async delete(id) {
    const Producto = await models.Producto.findByPk(id);
    if (!Producto) {
      throw boom.notFound('Producto no encontrado');
    }
    await Producto.destroy();
    return id;
  }

  async find(id) {
    const Producto = await models.Producto.findByPk(id);
    if (!Producto) {
      throw boom.notFound('Producto no encontrado');
    }
    const stock = await models.Stock_diario.findAll({ where: { producto_id: id } });
    let response;
    stock ? response = { ...Producto.dataValues, stock } : response = Producto.dataValues;
    return response;
  }

  async getAll() {
    const Productos = await models.Producto.findAll();
    let responseFinal = [];
    for (let i = 0; i < Productos.length; i++) {
      const stock = await models.Stock_diario.findAll({ where: { producto_id: Productos[i].id } });
      let response;
      stock ? response = { ...Productos[i].dataValues, stock } : response = Productos[i].dataValues;
      responseFinal = [...responseFinal, response];
    }
    return responseFinal;
  }
}

module.exports = ProductoController;
