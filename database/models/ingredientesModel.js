const { Model, DataTypes, Sequelize } = require('sequelize');
const { MATERIA_PRIMA_TABLE } = require('./materia_primaModel');
const { RECETA_TABLE } = require('./recetaModel');

const INGREDIENTES_TABLE = 'ingredientes';

const IngredientesSchema = {
  id: {
    allowNull: false, // not null
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  cantidad: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  materiaPrimaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'materia_prima_id',
    references: {
      model: MATERIA_PRIMA_TABLE,
      key: 'id',
    }
  },
  recetaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'receta_id',
    references: {
      model: RECETA_TABLE,
      key: 'id',
    },
  }
}

class Ingredientes extends Model {
  static associate(models) {
    this.belongsTo(models.Receta, {
      foreignKey: 'recetaId',
      as: 'receta',
    });
    this.belongsTo(models.Materia_prima, {
      foreignKey: 'materiaPrimaId',
      as: 'materia_prima',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INGREDIENTES_TABLE,
      modelName: 'Ingredientes',
      timestamps: false
    }
  }
}


module.exports = { INGREDIENTES_TABLE, IngredientesSchema, Ingredientes }
