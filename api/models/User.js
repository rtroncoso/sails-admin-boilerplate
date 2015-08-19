// api/models/User.js

var _ = require('lodash');
var _super = require('sails-permissions/api/models/User');

_.merge(exports, _super);
_.merge(exports, {

  attributes: {

    // Name
    name: {
      type: 'string',
      index: true
    },

    // Surname
    surname: {
      type: 'string',
      index: true
    }

  }

});
