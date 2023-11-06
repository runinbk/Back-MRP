const { Model, DataTypes, Sequelize } = require('sequelize');

const ALMACEN_TABLE = 'almacen';

const AlmacenSchema = {
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
  ubicacion: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'created_at',
  }
}

class Almacen extends Model {
  static associate(models) {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ALMACEN_TABLE,
      modelName: 'Almacen',
      timestamps: false
    }
  }
}


module.exports = { ALMACEN_TABLE, AlmacenSchema, Almacen }
