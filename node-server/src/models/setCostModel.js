const mongoose = require('mongoose');

// Define the schema for the estate host settings
const EstateHostSettingsSchema = new mongoose.Schema({
  Region: {
    type: String,
    required: true
  },
  Country: {
    type: String,
    required: true
  },
  Category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Amenities",
  },
  Currency: {
    type: String,
    required: true
  },
  TimeZone: {
    type: String,
    required: true
  },
  hostCost: {
    type: Number,
    required: true
  },
  subscriptionActive: {
    type: Boolean,
    required: true
  }
});

// Create a model from the schema
const EstateHostModel = mongoose.model('EstateHostSettings', EstateHostSettingsSchema);

module.exports = EstateHostModel;
