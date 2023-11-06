const { Model, DataTypes, Sequelize } = require('sequelize');

const PRODUCTO_TABLE = 'producto';

const ProductoSchema = {
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
    type: DataTypes.TEXT,
  },
  precio: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2)
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'created_at',
  }
}

class Producto extends Model {
  static associate(models) {
    this.hasOne(models.Receta, {
      foreignKey: 'productoId',
      as: 'receta',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCTO_TABLE,
      modelName: 'Producto',
      timestamps: false
    }
  }
}


module.exports = { PRODUCTO_TABLE, ProductoSchema, Producto }
