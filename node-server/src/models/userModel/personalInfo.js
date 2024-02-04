const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  file: {
    data: Buffer, // Define the binary data of the file
    contentType: String, // Define the MIME type of the file
    filename: String, // Define the original name of the file
  },
  lastModified: Date, // Define the last modified date of the file
  lastModifiedDate: Date, // Define the last modified date in a human-readable format
  name: String, // Define the name of the file as it appears in the system
  size: Number, // Define the size of the file in bytes
  type: String, // Define the MIME type of the file as a string (e.g., "image/png")
  webkitRelativePath: String, // Define the relative path to the file in WebKit browsers (e.g., "C:\Users\User\Downloads\file.png")
});

//   module.exports = fileSchema;

const incomeSchema = new mongoose.Schema({
  incomeSource: {
    type: String,
    required: true,
  },
  officeName: {
    type: String,
    required: true,
  },
  workplaceLocation: {
    type: String,
    required: true,
  },
  file: fileSchema,
});

const emergencyContactSchema = new mongoose.Schema({
  emergencyContactName: {
    type: String,
    required: true,
  },
  relationship: {
    type: String,
    required: true,
  },
  emergencyContactPhoneNumber: {
    type: String,
    required: true,
  },
});

const personalInfoSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  incomeSources: {
    type: incomeSchema,
  },
  emergencyContact:{
    type: emergencyContactSchema,
  }

});

const PersonalInfo = mongoose.model("PersonalInfo", personalInfoSchema);

module.exports = PersonalInfo;
