const { Model, DataTypes, Sequelize } = require('sequelize');
const { MAQUINA_TABLE } = require('./maquinaModel');
const { EMPLEADO_TABLE } = require('./empleadoModel');

const EMPLEADO_MAQUINA_TABLE = 'empleado_maquina';

const Empleado_maquinaSchema = {
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
  maquinaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'maquina_id',
    references: {
      model: MAQUINA_TABLE,
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

class Empleado_maquina extends Model {
  static associate(models) {
    this.belongsTo(models.Maquina, {
      foreignKey: 'maquinaId',
      as: 'maquina',
    });
    this.belongsTo(models.Empleado, {
      foreignKey: 'empleadoId',
      as: 'empleado',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EMPLEADO_MAQUINA_TABLE,
      modelName: 'Empleado_maquina',
      timestamps: false
    }
  }
}


module.exports = { EMPLEADO_MAQUINA_TABLE, Empleado_maquinaSchema, Empleado_maquina }
