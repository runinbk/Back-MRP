const { Model, DataTypes, Sequelize } = require('sequelize');
const { SECTOR_TABLE } = require('./sectorModel');
const { UNIDAD_MEDIDA_TABLE } = require('./unidad_medidaModel');

const MATERIA_PRIMA_TABLE = 'materia_prima';

const Materia_primaSchema = {
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
  stock: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  stockMinimo: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  fechaVencimiento: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  sectorId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'sector_id',
    references: {
      model: SECTOR_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  unidadId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'unidad_id',
    references: {
      model: UNIDAD_MEDIDA_TABLE,
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

class Materia_prima extends Model {
  static associate(models) {
    this.belongsTo(models.Unidad_medida, {
      foreignKey: 'unidadId',
      as: 'unidad',
    });
    this.belongsTo(models.Sector, {
      foreignKey: 'sectorId',
      as: 'sector',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MATERIA_PRIMA_TABLE,
      modelName: 'Materia_prima',
      timestamps: false
    }
  }
}


module.exports = { MATERIA_PRIMA_TABLE, Materia_primaSchema, Materia_prima }
