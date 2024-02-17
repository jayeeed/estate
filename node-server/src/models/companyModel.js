const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    companyName: String,
    companyRegistrationNumber: String,
    companyBankAccountNumber: String,
    companyAddress: String,
    companyAdditionalDetails: String,
    companyAppreciationDetails: String,
    companyLogo: {
      type: String,
      required: false,
    },
    companyBanner: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const CompanyModel = mongoose.model("Company", companySchema);

module.exports = CompanyModel;
