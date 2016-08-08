'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Definition Schema
 */
var DefinitionSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Definition name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Definition', DefinitionSchema);
