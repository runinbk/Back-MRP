const { Model, DataTypes, Sequelize } = require('sequelize');
const { PRODUCTO_TABLE } = require('./productoModel');

const RECETA_TABLE = 'receta';

const RecetaSchema = {
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
  descripcion: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  productoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'producto_id',
    references: {
      model: PRODUCTO_TABLE,
      key: 'id',
    }
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'created_at',
  }
}

class Receta extends Model {
  static associate(models) {
    this.belongsTo(models.Producto, {
      foreignKey: 'productoId',
      as: 'producto',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: RECETA_TABLE,
      modelName: 'Receta',
      timestamps: false
    }
  }
}


module.exports = { RECETA_TABLE, RecetaSchema, Receta }
