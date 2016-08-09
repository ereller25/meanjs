'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Customer Schema
 */
var CustomerSchema = new Schema({
  firstname: {
    type: String,
    default: '',
    required: 'Please fill Customer first name',
    trim: true
  },
  lastname: {
    type: String,
    default: '',
    required: 'Please fill Customer last name',
    trim: true
  },
  address: {
    type: String,
    default: '',
    required: 'Please fill Customer address',
    trim: true
  },
  phone: {
    type: String,
    default: '',
    required: 'Please fill Customer phone number',
    trim: true
  },
  email: {
    type: String,
    default: '',
    required: 'Please fill Customer email',
    trim: true
  },
  birthday: {
    type: Date,
    default: Date.now,
    required: 'Please fill date of birth',
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

mongoose.model('Customer', CustomerSchema);
