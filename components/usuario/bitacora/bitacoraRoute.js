const { checkRoles } = require('../../../middleware/roleHandler');
const response = require('../../../network/response');
const bitacoraController = require('./bitacoraController');
const express = require('express');
const passport = require('passport');

const router = express.Router();
const controller = new bitacoraController();

router.get('/',
  passport.authenticate('jwt', { session: false }), // Middleware de autenticación
  checkRoles('administrador','user'),
  async (req, res, next) => {
    await controller.getAll().then((data) => {
      response.success(req, res, data, 200);
    }).catch((err) => {
      next(err);
    });
  }
);

module.exports = router;
