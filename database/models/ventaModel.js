const { Model, DataTypes, Sequelize } = require('sequelize');
const { EMPLEADO_TABLE } = require('./empleadoModel');
const { CLIENTE_TABLE } = require('./clienteModel');

const VENTA_TABLE = 'venta';

const VentaSchema = {
  id: {
    allowNull: false, // not null
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  detalles: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  fechaEntrega: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'fecha_entrega',
  },
  fechaPedido: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'fecha_pedido',
  },
  total: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2),
  },
  empleadoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'empleado_id',
    references: {
      model: EMPLEADO_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  clienteId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'cliente_id',
    references: {
      model: CLIENTE_TABLE,
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

class Venta extends Model {
  static associate(models) {
    this.belongsTo(models.Empleado, {
      foreignKey: 'empleadoId',
      as: 'empleado',
    });
    this.belongsTo(models.Cliente, {
      foreignKey: 'clienteId',
      as: 'cliente',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: VENTA_TABLE,
      modelName: 'Venta',
      timestamps: false
    }
  }
}


module.exports = { VENTA_TABLE, VentaSchema, Venta }
