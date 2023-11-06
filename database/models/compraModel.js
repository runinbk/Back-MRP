const { Model, DataTypes, Sequelize } = require('sequelize');
const { EMPLEADO_TABLE } = require('./empleadoModel');

const COMPRA_TABLE = 'compra';

const CompraSchema = {
  id: {
    allowNull: false, // not null
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  fecha: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  total: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2),
  },
  empleadoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'empleado_id',
    references: {
      model: EMPLEADO_TABLE,
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

class Compra extends Model {
  static associate(models) {
    this.belongsTo(models.Empleado, {
      foreignKey: 'empleadoId',
      as: 'empleado',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: COMPRA_TABLE,
      modelName: 'Compra',
      timestamps: false
    }
  }
}


module.exports = { COMPRA_TABLE, CompraSchema, Compra }
