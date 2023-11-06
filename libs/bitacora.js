const { models } = require('../libs/sequelize');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

addBitacora = async function (token, area, identificador, accion) {
  const payload = jwt.decode(token, config.JWT_AUTH);
  const userId = payload.sub;
  const createdAt = new Date().toLocaleString('es-ES', { timeZone: 'America/La_Paz' });
  await models.Bitacora.create({
    accion, area, userId, identificador, createdAt,
  });
}
module.exports = addBitacora;
