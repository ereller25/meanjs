'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Definition = mongoose.model('Definition'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Definition
 */
exports.create = function(req, res) {
  var definition = new Definition(req.body);
  definition.user = req.user;

  definition.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(definition);
    }
  });
};

/**
 * Show the current Definition
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var definition = req.definition ? req.definition.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  definition.isCurrentUserOwner = req.user && definition.user && definition.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(definition);
};

/**
 * Update a Definition
 */
exports.update = function(req, res) {
  var definition = req.definition ;

  definition = _.extend(definition , req.body);

  definition.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(definition);
    }
  });
};

/**
 * Delete an Definition
 */
exports.delete = function(req, res) {
  var definition = req.definition ;

  definition.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(definition);
    }
  });
};

/**
 * List of Definitions
 */
exports.list = function(req, res) { 
  Definition.find().sort('-created').populate('user', 'displayName').exec(function(err, definitions) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(definitions);
    }
  });
};

/**
 * Definition middleware
 */
exports.definitionByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Definition is invalid'
    });
  }

  Definition.findById(id).populate('user', 'displayName').exec(function (err, definition) {
    if (err) {
      return next(err);
    } else if (!definition) {
      return res.status(404).send({
        message: 'No Definition with that identifier has been found'
      });
    }
    req.definition = definition;
    next();
  });
};
