const { Model, DataTypes, Sequelize } = require('sequelize');
const { PROCESO_TABLE } = require('./procesoModel');

const MAQUINA_TABLE = 'maquina';

const MaquinaSchema = {
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
  estado: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  capacidad: {
    allowNull: false,
    type: DataTypes.INTEGER,
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
  createdAt: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'created_at',
  }
}

class Maquina extends Model {
  static associate(models) {
    this.belongsTo(models.Proceso, {
      foreignKey: 'procesoId',
      as: 'proceso',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MAQUINA_TABLE,
      modelName: 'Maquina',
      timestamps: false
    }
  }
}


module.exports = { MAQUINA_TABLE, MaquinaSchema, Maquina }
