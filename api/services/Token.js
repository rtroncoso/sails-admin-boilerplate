'use strict';

/**
 * Token.js
 *
 * JWT token service which handles issuing and verifying tokens.
 */
var jwt    = require('jsonwebtoken');
var moment = require('moment');

/**
 * Service method to generate a new token based on payload we want to put on it.
 *
 * @param   {String}    payload
 *
 * @returns {*}
 */
module.exports.issue = function issue(data) {
  sails.log.verbose('[Service.Token.issue() called]');

  return buildToken(data, jwt.sign);
};

/**
 * Builds a token object given some data, it adds expiry time using
 * sails config object and other jwt essentials
 *
 * @param {Object}   data  Data object to build
 * @param {Function} cb Callback to call when token is built
 * @returns {*}
 */
function buildToken(data, cb) {
  var expires = sails.config.jwt.expires || {
    unit: 'minutes',
    time: 60
  };

  var payload = _.isObject(data) ? data : { id: data };
  var options = {
    expiresInSeconds: moment().add(expires.time, expires.unit).diff(moment(), 'seconds'),
    subject: payload.id || null,
    issuer: sails.getBaseUrl()
  };

  return cb(payload, sails.config.jwt.secret, options);
}

/**
 * Service method to verify that the token we received on a request hasn't be tampered with.
 *
 * @param   {String}    token   Token to validate
 * @param   {Function}  next    Callback function
 *
 * @returns {*}
 */
module.exports.verify = function verify(token, next) {
  sails.log.verbose('[Service.Token.verify() called]');

  return jwt.verify(
    token, // The token to be verified
    sails.config.jwt.secret, // The secret we used to sign it.
    { issuer: sails.getBaseUrl() }, // Options
    next // The callback to be call when the verification is done.
  );
};

/**
 * Service method to get current user token. Note that this will also verify actual token value.
 *
 * @param   {Request}   request     Request object
 * @param   {Function}  next        Callback function
 * @param   {Boolean}   throwError  Throw error from invalid token specification
 *
 * @return  {*}
 */
module.exports.getToken = function getToken(request, next, throwError) {
  sails.log.verbose('[Service.Token.getToken() called]');

  var token = '';

  // Yeah we got required 'authorization' header
  if (request.headers && request.headers.authorization) {
    var parts = request.headers.authorization.split(' ');

    if (parts.length === 2) {
      var scheme = parts[0];
      var credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else if (throwError) {
      throw new Error('Invalid authorization header format. Format is Authorization: Bearer [token]');
    }
  } else if (request.param('token')) { // JWT token sent by parameter
    token = request.param('token');
  } else if (throwError) { // Otherwise request didn't contain required JWT token
    throw new Error('No authorization header was found');
  }

  return sails.services.token.verify(token, next);
};
