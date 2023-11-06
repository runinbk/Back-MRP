const { Model, DataTypes, Sequelize } = require('sequelize');
const { PRODUCTO_TABLE } = require('./productoModel');

const STOCK_DIARIO_TABLE = 'stock_diario';

const Stock_diarioSchema = {
  id: {
    allowNull: false, // not null
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  cantidad: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  estado: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  fecha: {
    allowNull: false,
    type: DataTypes.STRING,
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
  createdAt: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'created_at',
  }
}

class Stock_diario extends Model {
  static associate(models) {
    this.belongsTo(models.Producto, {
      foreignKey: 'productoId',
      as: 'producto',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: STOCK_DIARIO_TABLE,
      modelName: 'Stock_diario',
      timestamps: false
    }
  }
}


module.exports = { STOCK_DIARIO_TABLE, Stock_diarioSchema, Stock_diario }
