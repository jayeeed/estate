const mongoose = require("mongoose");

const subCompanySchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    subCompanyName: {
      type: String,
      required: true,
    },
    subCompanyRegistrationNumber: {
      type: String,
      required: true,
    },
    subCompanybankAccountNumber: {
      type: String,
      required: true,
    },
    subCompanyAddress: {
      type: String,
      required: true,
    },
    subCompanyAdditionalDetails: {
      type: String,
      required: true,
    },
    subCompanyAppreciationDetails: {
      type: String,
      required: true,
    },
    subCompanyLogo: {
      type: String,
      required: false,
    },
    subCompanyBanner: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const SubCompanyModel = mongoose.model("SubCompany", subCompanySchema);

module.exports = SubCompanyModel;
