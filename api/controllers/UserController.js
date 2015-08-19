// api/controllers/UserController.js

var _ = require('lodash');
var _super = require('sails-permissions/api/controllers/UserController');

_.merge(exports, _super);
_.merge(exports, {

  // Extend with custom logic here by adding additional fields, methods, etc.

  /**
   * Returns user info using a jwt token in request
   *
   * @param req
   * @param res
   */
  me: function (req, res) {
    User.findOne({ id: req.token.id })
      .then(function(user) {
        res.ok(user);
      })
      .catch(function(err) {
        res.unauthorized(err);
      });
  }

});
