'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Employee Schema
 */
var EmployeeSchema = new Schema({
  firstname: {
    type: String,
    default: '',
    required: 'Please fill Employee first name',
    trim: true
  },
  lastname: {
    type: String,
    default: '',
    required: 'Please fill Employee last name',
    trim: true
  },
  address: {
    type: String,
    default: '',
    required: 'Please fill Employee address',
    trim: true
  },
  phone: {
    type: String,
    default: '',
    required: 'Please fill Employee phone number',
    trim: true
  },
  email: {
    type: String,
    default: '',
    required: 'Please fill Employee email',
    trim: true
  },
  department:{
    type: String,
    default: '',
    required: 'Please fill Employee department',
    trim: true
  },
  datehired: {
    type: Date,
    default: Date.now,
    required: 'Please fill date hired',
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

mongoose.model('Employee', EmployeeSchema);
