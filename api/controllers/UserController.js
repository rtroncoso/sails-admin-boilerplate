// api/controllers/UserController.js

var _ = require('lodash');
var _super = require('sails-permissions/api/controllers/UserController');

_.merge(exports, _super);
_.merge(exports, {

  /**
   * Returns user info using a jwt token in request
   *
   * @param req
   * @param res
   */
  me: function (req, res) {
    res.ok(req.user);
  }

});
