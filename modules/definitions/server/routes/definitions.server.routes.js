'use strict';

/**
 * Module dependencies
 */
var definitionsPolicy = require('../policies/definitions.server.policy'),
  definitions = require('../controllers/definitions.server.controller');

module.exports = function(app) {
  // Definitions Routes
  app.route('/api/definitions').all(definitionsPolicy.isAllowed)
    .get(definitions.list)
    .post(definitions.create);

  app.route('/api/definitions/:definitionId').all(definitionsPolicy.isAllowed)
    .get(definitions.read)
    .put(definitions.update)
    .delete(definitions.delete);

  // Finish by binding the Definition middleware
  app.param('definitionId', definitions.definitionByID);
};
