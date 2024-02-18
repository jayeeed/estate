const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    companyRegistrationNumber: {
      type: String,
      required: true,
    },
    companyBankAccountNumber: {
      type: String,
      required: true,
    },
    companyAddress: {
      type: String,
      required: true,
    },
    companyAdditionalDetails: {
      type: String,
      required: true,
    },
    companyAppreciationDetails: {
      type: String,
      required: true,
    },
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
