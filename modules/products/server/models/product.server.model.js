'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Product Schema
 */
var ProductSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Product name',
    trim: true
  },
  description: {
    type: String,
    default: '',
    required: 'Please fill in Product type',
    trim: true
  },
  department: {
    type: String,
    default: '',
    required: 'Please fill in Product department',
    trim: true
  },
  upc: {
    type: Number,
    default: '',
    required: 'Please fill in Product UPC code',
    trim: true
  },
  inventory: {
    type: Number,
    default: '',
    required: 'Please update Product inventory',
    trim: true
  },
  price: {
    type: Number,
    default: '',
    required: 'Please fill in Product price',
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

mongoose.model('Product', ProductSchema);
