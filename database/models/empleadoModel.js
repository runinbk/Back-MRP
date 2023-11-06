const { Model, DataTypes, Sequelize } = require('sequelize');
const { CARGO_TABLE } = require('./cargoModel');
const { USER_TABLE } = require('./userModel');

const EMPLEADO_TABLE = 'empleado';

const EmpleadoSchema = {
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
  ci: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  direccion: {
    allowNull: false,
    type: DataTypes.STRING
  },
  sexo: {
    allowNull: false,
    type: DataTypes.STRING
  },
  cargoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'cargo_id',
    references: {
      model: CARGO_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'user_id',
    references: {
      model: USER_TABLE,
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

class Empleado extends Model {
  static associate(models) {
    this.belongsTo(models.Cargo, {
      foreignKey: 'cargoId',
      as: 'cargo',
    });

    this.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      attributes: {
        exclude: ['password', 'recoveryToken']
      },
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EMPLEADO_TABLE,
      modelName: 'Empleado',
      timestamps: false
    }
  }
}


module.exports = { EMPLEADO_TABLE, EmpleadoSchema, Empleado }
