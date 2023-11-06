const { Model, DataTypes, Sequelize } = require('sequelize');
const { PRODUCTO_TABLE } = require('./productoModel');
const { VENTA_TABLE } = require('./ventaModel');

const DETALLE_VENTA_TABLE = 'detalle_venta';

const Detalle_ventaSchema = {
  id: {
    allowNull: false, // not null
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  cantidad: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  precio: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2),
  },
  ventaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'venta_id',
    references: {
      model: VENTA_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  productoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'producto_id',
    references: {
      model: PRODUCTO_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Detalle_venta extends Model {
  static associate(models) {
    // associations can be defined here
    this.belongsTo(models.Producto, {
      foreignKey: 'productoId',
      as: 'producto',
    });
    this.belongsTo(models.Venta, {
      foreignKey: 'ventaId',
      as: 'venta',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DETALLE_VENTA_TABLE,
      modelName: 'Detalle_venta',
      timestamps: false,
    };
  }
}

module.exports = { DETALLE_VENTA_TABLE, Detalle_ventaSchema, Detalle_venta };
