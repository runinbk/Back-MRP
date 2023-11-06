const { Model, DataTypes, Sequelize } = require('sequelize');
const { PROVEEDOR_TABLE } = require('./proveedorModel');
const { UNIDAD_MEDIDA_TABLE } = require('./unidad_medidaModel');
const { MATERIA_PRIMA_TABLE } = require('./materia_primaModel');
const { COMPRA_TABLE } = require('./compraModel');

const DETALLE_COMPRA_TABLE = 'detalle_compra';

const Detalle_compraSchema = {
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
  precio: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2),
  },
  proveedorId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'proveedor_id',
    references: {
      model: PROVEEDOR_TABLE,
      key: 'id',
    }
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
  materiaPrimaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'materia_prima_id',
    references: {
      model: MATERIA_PRIMA_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  notaCompraId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'nota_compra_id',
    references: {
      model: COMPRA_TABLE,
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

class Detalle_compra extends Model {
  static associate(models) {
    this.belongsTo(models.Proveedor, {
      foreignKey: 'proveedorId',
      as: 'proveedor',
    });
    this.belongsTo(models.Unidad_medida, {
      foreignKey: 'unidadId',
      as: 'unidad',
    });
    this.belongsTo(models.Materia_prima, {
      foreignKey: 'materiaPrimaId',
      as: 'materia_prima',
    });
    this.belongsTo(models.Compra, {
      foreignKey: 'notaCompraId',
      as: 'nota_compra',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DETALLE_COMPRA_TABLE,
      modelName: 'Detalle_compra',
      timestamps: false
    }
  }
}


module.exports = { DETALLE_COMPRA_TABLE, Detalle_compraSchema, Detalle_compra }
