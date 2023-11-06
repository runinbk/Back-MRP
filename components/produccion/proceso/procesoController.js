const { models } = require('../../../libs/sequelize');
const boom = require('@hapi/boom');

class ProcesoController {
  constructor() { }

  /*
  {
    ...data,
    empleados = [],
    productos = []
  }
  */
  async add(data) {
    const newProceso = await models.Proceso.create({
      ...data,
      createdAt: new Date().toLocaleString('es-ES', { timeZone: 'America/La_Paz' })
    });
    if (data.empleados != null) {
      for (let i = 0; i < data.empleados.length; i++) {
        await models.Empleado_proceso.create({
          ...data.empleados[i],
          procesoId: newProceso.id,
        });
      }
    }
    if (data.productos != null) {
      for (let i = 0; i < data.productos.length; i++) {
        await models.Producto_proceso.create({
          ...data.productos[i],
          procesoId: newProceso.id,
        });
      }
    }
    return newProceso;
  }

  async edit(data, id) {
    const Proceso = await models.Proceso.findByPk(id);
    if (!Proceso) {
      throw boom.notFound('Proceso no encontrado');
    }
    const ProcesoUpdated = await Proceso.update({
      ...data,
    });

    const empleados = await models.Empleado_proceso.findAll({ where: { procesoId: id } });
    for (let i = 0; i < empleados.length; i++) {
      await empleados[i].destroy();
    }
    if (data.empleados != null) {
      for (let i = 0; i < data.empleados.length; i++) {
        await models.Empleado_proceso.create({
          ...data.empleados[i],
          procesoId: id,
        });
      }
    }
    const productos = await models.Producto_proceso.findAll({ where: { procesoId: id } });
    for (let i = 0; i < productos.length; i++) {
      await productos[i].destroy();
    }
    if (data.productos != null) {
      for (let i = 0; i < data.productos.length; i++) {
        await models.Producto_proceso.create({
          ...data.productos[i],
          procesoId: id,
        });
      }
    }
    return ProcesoUpdated;
  }

  async delete(id) {
    const Proceso = await models.Proceso.findByPk(id);
    if (!Proceso) {
      throw boom.notFound('Proceso no encontrado');
    }
    const empleados = await models.Empleado_proceso.findAll({ where: { procesoId: id } });
    for (let i = 0; i < empleados.length; i++) {
      await empleados[i].destroy();
    }
    const productos = await models.Producto_proceso.findAll({ where: { procesoId: id } });
    for (let i = 0; i < productos.length; i++) {
      await productos[i].destroy();
    }
    await Proceso.destroy();
    return id;
  }

  async find(id) {
    const Proceso = await models.Proceso.findByPk(id);
    if (!Proceso) {
      throw boom.notFound('Proceso no encontrado');
    }
    const maquinas = await models.Maquina.findAll({ where: { procesoId: id } });
    const empleados = await models.Empleado_proceso.findAll({ where: { procesoId: id }, include: ['empleado'] });
    const productos = await models.Producto_proceso.findAll({ where: { procesoId: id }, include: ['producto'] });
    return {
      ...Proceso.dataValues,
      maquinas,
      empleados,
      productos
    };
  }

  async getAll() {
    const Procesos = await models.Proceso.findAll();
    let response = [];
    for (let i = 0; i < Procesos.length; i++) {
      const maquinas = await models.Maquina.findAll({ where: { procesoId: Procesos[i].id } });
      const empleados = await models.Empleado_proceso.findAll({ where: { procesoId: Procesos[i].id }, include: ['empleado'] });
      const productos = await models.Producto_proceso.findAll({ where: { procesoId: Procesos[i].id }, include: ['producto'] });
      response.push({
        ...Procesos[i].dataValues,
        maquinas,
        empleados,
        productos
      });
    }
    return response;
  }
}

module.exports = ProcesoController;
