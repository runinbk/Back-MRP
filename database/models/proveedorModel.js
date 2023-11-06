const { Model, DataTypes, Sequelize } = require('sequelize');

const PROVEEDOR_TABLE = 'proveedor';

const ProveedorSchema = {
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
  apellido: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  direccion: {
    allowNull: false,
    type: DataTypes.STRING
  },
  telefono: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'created_at',
  }
}

class Proveedor extends Model {
  static associate(models) {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROVEEDOR_TABLE,
      modelName: 'Proveedor',
      timestamps: false
    }
  }
}


module.exports = { PROVEEDOR_TABLE, ProveedorSchema, Proveedor }
