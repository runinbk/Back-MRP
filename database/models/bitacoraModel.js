const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./userModel');

const BITACORA_TABLE = 'bitacora';

const BitacoraSchema = {
  id: {
    allowNull: false, // not null
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  accion: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  area: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  identificador: {
    allowNull: false,
    type: DataTypes.INTEGER,
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
    defaultValue: Sequelize.NOW
  }
}

class Bitacora extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: BITACORA_TABLE,
      modelName: 'Bitacora',
      timestamps: false
    }
  }
}


module.exports = { BITACORA_TABLE, BitacoraSchema, Bitacora }
