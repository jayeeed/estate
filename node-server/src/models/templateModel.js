// models/FileUpload.js

const mongoose = require('mongoose');

const fileUploadSchema = new mongoose.Schema({
  filename: String,
  data: Buffer,
  encoding: String,
  contentType: String,
  // Add more fields as needed to store additional information about the file
});

const FileUpload = mongoose.model('FileUpload', fileUploadSchema);

module.exports = FileUpload;
