const { Model, DataTypes, Sequelize } = require('sequelize');

const CARGO_TABLE = 'cargo';

const CargoSchema = {
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
  sueldo: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'created_at',
  }
}

class Cargo extends Model {
  static associate(models) {

    // associations can be defined here
    this.hasMany(models.Empleado, {
      as: 'empleados',
      foreignKey: 'cargoId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CARGO_TABLE,
      modelName: 'Cargo',
      timestamps: false
    }
  }
}


module.exports = { CARGO_TABLE, CargoSchema, Cargo }
