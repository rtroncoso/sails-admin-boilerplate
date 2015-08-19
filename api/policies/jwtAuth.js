var _ = require('lodash');

/**
 * jwtAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that the client sent a valid JWT in the request
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {
  sails.log.verbose('[Policy.Authenticated() called]');

  /**
   * Helper function to process possible error and actual token after it is decoded.
   *
   * @param   {{}}      error Possible error
   * @param   {Number}  token Decoded JWT token data
   * @returns {*}
   */
  var verify = function verify(error, token) {
    if (!(_.isEmpty(error) && token !== -1)) {
      return res.unauthorized('Given authorization token is not valid');
    } else {
      // Store user id to req object
      req.token = token;

      // We delete the token from query and body to not mess with blueprints
      req.query && delete req.query.token;
      req.body && delete req.body.token;

      return next();
    }
  };

  // Get and verify JWT via service
  try {
    sails.services.token.getToken(req, verify, true);
  } catch (error) {
    return res.unauthorized(error.message);
  }
};