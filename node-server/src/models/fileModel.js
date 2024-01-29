const mongoose = require('mongoose');
const incomeSchema = mongoose.Schema({
    incomeSource: String,
    officeName: String,
    workplaceLocation: String,
    file: {
      data: Buffer,
      contentType: String
    }
  });
  
  // Define a model for the income information
  const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;
