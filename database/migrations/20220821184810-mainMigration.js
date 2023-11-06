'use strict';

const { USER_TABLE, UserSchema } = require('../models/userModel');
const { EMPLEADO_TABLE, EmpleadoSchema } = require('../models/empleadoModel');
const { CARGO_TABLE, CargoSchema } = require('../models/cargoModel');
const { BITACORA_TABLE, BitacoraSchema } = require('../models/bitacoraModel');

const { CLIENTE_TABLE, ClienteSchema } = require('../models/clienteModel');
const { PRODUCTO_TABLE, ProductoSchema } = require('../models/productoModel');
const { DETALLE_VENTA_TABLE, Detalle_ventaSchema } = require('../models/detalle_ventaModel');
const { STOCK_DIARIO_TABLE, Stock_diarioSchema } = require('../models/stock_diarioModel');
const { VENTA_TABLE, VentaSchema } = require('../models/ventaModel');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CARGO_TABLE, CargoSchema);
    await queryInterface.createTable(EMPLEADO_TABLE, EmpleadoSchema);
    await queryInterface.createTable(BITACORA_TABLE, BitacoraSchema);

    await queryInterface.createTable(CLIENTE_TABLE, ClienteSchema);
    await queryInterface.createTable(PRODUCTO_TABLE, ProductoSchema);
    await queryInterface.createTable(VENTA_TABLE, VentaSchema);
    await queryInterface.createTable(DETALLE_VENTA_TABLE, Detalle_ventaSchema);
    await queryInterface.createTable(STOCK_DIARIO_TABLE, Stock_diarioSchema);
    // Add others migrations here

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(DETALLE_VENTA_TABLE);
    await queryInterface.dropTable(STOCK_DIARIO_TABLE);
    await queryInterface.dropTable(VENTA_TABLE);
    await queryInterface.dropTable(CLIENTE_TABLE);
    await queryInterface.dropTable(PRODUCTO_TABLE);

    await queryInterface.dropTable(BITACORA_TABLE);
    await queryInterface.dropTable(EMPLEADO_TABLE);
    await queryInterface.dropTable(CARGO_TABLE);
    await queryInterface.dropTable(USER_TABLE);
    // Add others migrations here
  }
};
