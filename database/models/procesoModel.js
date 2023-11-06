const { Model, DataTypes, Sequelize } = require('sequelize');

const PROCESO_TABLE = 'proceso';

const ProcesoSchema = {
  id: {
    allowNull: false, // not null
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  descripcion: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  tiempo: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'created_at',
  }
}

class Proceso extends Model {
  static associate(models) {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROCESO_TABLE,
      modelName: 'Proceso',
      timestamps: false
    }
  }
}


module.exports = { PROCESO_TABLE, ProcesoSchema, Proceso }
