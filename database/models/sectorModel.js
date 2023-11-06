const { Model, DataTypes, Sequelize } = require('sequelize');
const { ALMACEN_TABLE } = require('./almacenModel');

const SECTOR_TABLE = 'sector';

const SectorSchema = {
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
  almacenId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'almacen_id',
    references: {
      model: ALMACEN_TABLE,
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

class Sector extends Model {
  static associate(models) {
    this.belongsTo(models.Almacen, {
      foreignKey: 'almacenId',
      as: 'almacen',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SECTOR_TABLE,
      modelName: 'Sector',
      timestamps: false
    }
  }
}


module.exports = { SECTOR_TABLE, SectorSchema, Sector }
