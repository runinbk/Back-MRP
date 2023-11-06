const { Model, DataTypes, Sequelize } = require('sequelize');
const { PROCESO_TABLE } = require('./procesoModel');
const { PRODUCTO_TABLE } = require('./productoModel');

const PRODUCTO_PROCESO_TABLE = 'producto_proceso';

const Producto_procesoSchema = {
  id: {
    allowNull: false, // not null
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  procesoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'proceso_id',
    references: {
      model: PROCESO_TABLE,
      key: 'id',
    }
  },
  productoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'producto_id',
    references: {
      model: PRODUCTO_TABLE,
      key: 'id',
    },
  },
}

class Producto_proceso extends Model {
  static associate(models) {
    this.belongsTo(models.Proceso, {
      foreignKey: 'procesoId',
      as: 'proceso',
    });
    this.belongsTo(models.Producto, {
      foreignKey: 'productoId',
      as: 'producto',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCTO_PROCESO_TABLE,
      modelName: 'Producto_proceso',
      timestamps: false
    }
  }
}


module.exports = { PRODUCTO_PROCESO_TABLE, Producto_procesoSchema, Producto_proceso }
