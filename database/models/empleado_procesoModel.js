const { Model, DataTypes, Sequelize } = require('sequelize');
const { EMPLEADO_TABLE } = require('./empleadoModel');
const { PROCESO_TABLE } = require('./procesoModel');

const EMPLEADO_PROCESO_TABLE = 'empleado_proceso';

const Empleado_procesoSchema = {
  id: {
    allowNull: false, // not null
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  estadoEmpleado: {
    allowNull: false,
    field: 'estado_empleado',
    type: DataTypes.BOOLEAN,
  },
  cantidad: {
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
  empleadoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'empleado_id',
    references: {
      model: EMPLEADO_TABLE,
      key: 'id',
    },
  },
}

class Empleado_proceso extends Model {
  static associate(models) {
    this.belongsTo(models.Proceso, {
      foreignKey: 'procesoId',
      as: 'proceso',
    });
    this.belongsTo(models.Empleado, {
      foreignKey: 'empleadoId',
      as: 'empleado',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EMPLEADO_PROCESO_TABLE,
      modelName: 'Empleado_proceso',
      timestamps: false
    }
  }
}


module.exports = { EMPLEADO_PROCESO_TABLE, Empleado_procesoSchema, Empleado_proceso }
