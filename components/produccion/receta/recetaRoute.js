const { addSchema, editSchema, getSchema } = require('./recetaSchema');
const { checkRoles } = require('../../../middleware/roleHandler');
const validatorHandler = require('../../../middleware/validatorHandler');
const response = require('../../../network/response');
const recetaController = require('./recetaController');
const express = require('express');
const passport = require('passport');
const addBitacora = require('../../../libs/bitacora');

const router = express.Router();
const controller = new recetaController();

router.get('/',
  passport.authenticate('jwt', { session: false }), // Middleware de autenticación
  checkRoles('administrador', 'procesos'),
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
  checkRoles('administrador', 'procesos'),
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
  checkRoles('administrador', 'procesos'),
  validatorHandler(addSchema, 'body'),
  async (req, res, next) => {
    await controller.add(req.body).then((data) => {
      addBitacora(req.headers.authorization.split(' ')[1], 'Receta', data.id, 'Agregó una receta');
      response.success(req, res, data, 201);
    }).catch((err) => {
      next(err);
    })
  }
);

router.put('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('administrador', 'procesos'),
  validatorHandler(getSchema, 'params'),
  validatorHandler(editSchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    await controller.edit(body, id)
      .then((data) => {
        addBitacora(req.headers.authorization.split(' ')[1], 'Receta', id, 'Editó una receta');
        response.success(req, res, data, 201);
      }).catch((err) => {
        next(err);
      });
  }
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('administrador', 'procesos'),
  validatorHandler(getSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    await controller.delete(id)
      .then((data) => {
        addBitacora(req.headers.authorization.split(' ')[1], 'Receta', id, 'Eliminó una receta');
        response.success(req, res, data, 201);
      }).catch((err) => {
        next(err);
      });
  }
);

module.exports = router;
