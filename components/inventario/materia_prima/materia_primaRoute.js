const { addSchema, editSchema, getSchema } = require('./materia_primaSchema');
const { checkRoles } = require('../../../middleware/roleHandler');
const validatorHandler = require('../../../middleware/validatorHandler');
const response = require('../../../network/response');
const materia_primaController = require('./materia_primaController');
const express = require('express');
const passport = require('passport');
const addBitacora = require('../../../libs/bitacora');

const router = express.Router();
const controller = new materia_primaController();

router.get('/',
  passport.authenticate('jwt', { session: false }), // Middleware de autenticación
  checkRoles('administrador', 'inventario'),
  async (req, res, next) => {
    await controller.getAll().then((data) => {
      response.success(req, res, data, 200);
    }).catch((err) => {
      next(err);
    });
  }
);

router.get('/:id',
  passport.authenticate('jwt', { session: false }), // Middleware de autenticación
  checkRoles('administrador', 'inventario'),
  validatorHandler(getSchema, 'params'), // Middleware de validación
  async (req, res, next) => {
    const { id } = req.params;
    await controller.find(id)
      .then((data) => {
        response.success(req, res, data, 200);
      }).catch((err) => {
        next(err);
      });
  }
);

router.post('/',
  passport.authenticate('jwt', { session: false }), // Middleware de autenticación
  checkRoles('administrador', 'inventario'),
  validatorHandler(addSchema, 'body'),
  async (req, res, next) => {
    await controller.add(req.body).then((data) => {
      addBitacora(req.headers.authorization.split(' ')[1], 'Materia Prima', data.id, 'Agregó una nueva materia prima');
      response.success(req, res, data, 201);
    }).catch((err) => {
      next(err);
    })
  }
);

router.put('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('administrador', 'inventario'),
  validatorHandler(getSchema, 'params'),
  validatorHandler(editSchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    await controller.edit(body, id)
      .then((data) => {
        addBitacora(req.headers.authorization.split(' ')[1], 'Materia Prima', id, 'Editó una materia prima');
        response.success(req, res, data, 201);
      }).catch((err) => {
        next(err);
      });
  }
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('administrador', 'inventario'),
  validatorHandler(getSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    await controller.delete(id)
      .then((data) => {
        addBitacora(req.headers.authorization.split(' ')[1], 'Materia Prima', id, 'Eliminó una materia prima');
        response.success(req, res, data, 201);
      }).catch((err) => {
        next(err);
      });
  }
);

module.exports = router;
