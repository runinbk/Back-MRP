const { User, UserSchema } = require('./userModel');
const { Cargo, CargoSchema } = require('./cargoModel');
const { Empleado, EmpleadoSchema } = require('./empleadoModel');
const { Bitacora, BitacoraSchema } = require('./bitacoraModel');

const { Cliente, ClienteSchema } = require('./clienteModel');
const { Producto, ProductoSchema } = require('./productoModel');
const { Venta, VentaSchema } = require('./ventaModel');
const { Detalle_venta, Detalle_ventaSchema } = require('./detalle_ventaModel');
const { Stock_diario, Stock_diarioSchema } = require('./stock_diarioModel');

const { Proveedor, ProveedorSchema } = require('./proveedorModel');
const { Compra, CompraSchema } = require('./compraModel');
const { Detalle_compra, Detalle_compraSchema } = require('./detalle_compraModel');
const { Almacen, AlmacenSchema } = require('./almacenModel');
const { Sector, SectorSchema } = require('./sectorModel');
const { Unidad_medida, Unidad_medidaSchema } = require('./unidad_medidaModel');
const { Materia_prima, Materia_primaSchema } = require('./materia_primaModel');

const { Receta, RecetaSchema } = require('./recetaModel');
const { Ingredientes, IngredientesSchema } = require('./ingredientesModel');
const { Producto_proceso, Producto_procesoSchema } = require('./producto_procesoModel');
const { Proceso, ProcesoSchema } = require('./procesoModel');
const { Maquina, MaquinaSchema } = require('./maquinaModel');
const { Empleado_proceso, Empleado_procesoSchema } = require('./empleado_procesoModel');
const { Empleado_maquina, Empleado_maquinaSchema } = require('./empleado_maquinaModel');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Cargo.init(CargoSchema, Cargo.config(sequelize));
  Empleado.init(EmpleadoSchema, Empleado.config(sequelize));
  Bitacora.init(BitacoraSchema, Bitacora.config(sequelize));

  Cliente.init(ClienteSchema, Cliente.config(sequelize));
  Producto.init(ProductoSchema, Producto.config(sequelize));
  Venta.init(VentaSchema, Venta.config(sequelize));
  Detalle_venta.init(Detalle_ventaSchema, Detalle_venta.config(sequelize));
  Stock_diario.init(Stock_diarioSchema, Stock_diario.config(sequelize));

  Almacen.init(AlmacenSchema, Almacen.config(sequelize));
  Sector.init(SectorSchema, Sector.config(sequelize));
  Unidad_medida.init(Unidad_medidaSchema, Unidad_medida.config(sequelize));
  Proveedor.init(ProveedorSchema, Proveedor.config(sequelize));
  Materia_prima.init(Materia_primaSchema, Materia_prima.config(sequelize));
  Compra.init(CompraSchema, Compra.config(sequelize));
  Detalle_compra.init(Detalle_compraSchema, Detalle_compra.config(sequelize));

  Receta.init(RecetaSchema, Receta.config(sequelize));
  Ingredientes.init(IngredientesSchema, Ingredientes.config(sequelize));
  Producto_proceso.init(Producto_procesoSchema, Producto_proceso.config(sequelize));
  Proceso.init(ProcesoSchema, Proceso.config(sequelize));
  Maquina.init(MaquinaSchema, Maquina.config(sequelize));
  Empleado_proceso.init(Empleado_procesoSchema, Empleado_proceso.config(sequelize));
  Empleado_maquina.init(Empleado_maquinaSchema, Empleado_maquina.config(sequelize));


  // Associations
  User.associate(sequelize.models);
  Cargo.associate(sequelize.models);
  Empleado.associate(sequelize.models);
  Bitacora.associate(sequelize.models);

  Cliente.associate(sequelize.models);
  Producto.associate(sequelize.models);
  Detalle_venta.associate(sequelize.models);
  Stock_diario.associate(sequelize.models);
  Venta.associate(sequelize.models);

  Detalle_compra.associate(sequelize.models);
  Almacen.associate(sequelize.models);
  Sector.associate(sequelize.models);
  Unidad_medida.associate(sequelize.models);
  Compra.associate(sequelize.models);
  Materia_prima.associate(sequelize.models);
  Proveedor.associate(sequelize.models);

  Receta.associate(sequelize.models);
  Ingredientes.associate(sequelize.models);
  Producto_proceso.associate(sequelize.models);
  Proceso.associate(sequelize.models);
  Maquina.associate(sequelize.models);
  Empleado_proceso.associate(sequelize.models);
  Empleado_maquina.associate(sequelize.models);
}

module.exports = setupModels;
