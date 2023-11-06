const { Model, DataTypes, Sequelize } = require('sequelize');

const UNIDAD_MEDIDA_TABLE = 'unidad_medida';

const Unidad_medidaSchema = {
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
  abreviatura: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'created_at',
  }
}

class Unidad_medida extends Model {
  static associate(models) {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: UNIDAD_MEDIDA_TABLE,
      modelName: 'Unidad_medida',
      timestamps: false
    }
  }
}


module.exports = { UNIDAD_MEDIDA_TABLE, Unidad_medidaSchema, Unidad_medida }
