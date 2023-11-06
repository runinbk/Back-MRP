'use strict';

const { DETALLE_COMPRA_TABLE, Detalle_compraSchema } = require('../models/detalle_compraModel');
const { COMPRA_TABLE, CompraSchema } = require('../models/compraModel');
const { PROVEEDOR_TABLE, ProveedorSchema } = require('../models/proveedorModel');
const { ALMACEN_TABLE, AlmacenSchema } = require('../models/almacenModel');
const { SECTOR_TABLE, SectorSchema } = require('../models/sectorModel');
const { UNIDAD_MEDIDA_TABLE, Unidad_medidaSchema } = require('../models/unidad_medidaModel');
const { MATERIA_PRIMA_TABLE, Materia_primaSchema } = require('../models/materia_primaModel');

const { RECETA_TABLE, RecetaSchema } = require('../models/recetaModel');
const { PROCESO_TABLE, ProcesoSchema } = require('../models/procesoModel');
const { INGREDIENTES_TABLE, IngredientesSchema } = require('../models/ingredientesModel');
const { MAQUINA_TABLE, MaquinaSchema } = require('../models/maquinaModel');
const { PRODUCTO_PROCESO_TABLE, Producto_procesoSchema } = require('../models/producto_procesoModel');
const { EMPLEADO_PROCESO_TABLE, Empleado_procesoSchema } = require('../models/empleado_procesoModel');
const { EMPLEADO_MAQUINA_TABLE, Empleado_maquinaSchema } = require('../models/empleado_maquinaModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(ALMACEN_TABLE, AlmacenSchema);
    await queryInterface.createTable(SECTOR_TABLE, SectorSchema);
    await queryInterface.createTable(UNIDAD_MEDIDA_TABLE, Unidad_medidaSchema);
    await queryInterface.createTable(MATERIA_PRIMA_TABLE, Materia_primaSchema);
    await queryInterface.createTable(PROVEEDOR_TABLE, ProveedorSchema);
    await queryInterface.createTable(COMPRA_TABLE, CompraSchema);
    await queryInterface.createTable(DETALLE_COMPRA_TABLE, Detalle_compraSchema);

    await queryInterface.createTable(RECETA_TABLE, RecetaSchema);
    await queryInterface.createTable(PROCESO_TABLE, ProcesoSchema);
    await queryInterface.createTable(INGREDIENTES_TABLE, IngredientesSchema);
    await queryInterface.createTable(MAQUINA_TABLE, MaquinaSchema);
    await queryInterface.createTable(PRODUCTO_PROCESO_TABLE, Producto_procesoSchema);
    await queryInterface.createTable(EMPLEADO_PROCESO_TABLE, Empleado_procesoSchema);
    await queryInterface.createTable(EMPLEADO_MAQUINA_TABLE, Empleado_maquinaSchema);

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(INGREDIENTES_TABLE);

    await queryInterface.dropTable(DETALLE_COMPRA_TABLE);
    await queryInterface.dropTable(MATERIA_PRIMA_TABLE);
    await queryInterface.dropTable(UNIDAD_MEDIDA_TABLE);
    await queryInterface.dropTable(SECTOR_TABLE);
    await queryInterface.dropTable(ALMACEN_TABLE);
    await queryInterface.dropTable(PROVEEDOR_TABLE);
    await queryInterface.dropTable(COMPRA_TABLE);

    await queryInterface.dropTable(PRODUCTO_PROCESO_TABLE);
    await queryInterface.dropTable(EMPLEADO_PROCESO_TABLE);
    await queryInterface.dropTable(EMPLEADO_MAQUINA_TABLE);
    await queryInterface.dropTable(MAQUINA_TABLE);
    await queryInterface.dropTable(PROCESO_TABLE);
    await queryInterface.dropTable(RECETA_TABLE);
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
