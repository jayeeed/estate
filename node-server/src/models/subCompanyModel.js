const mongoose = require("mongoose");

const subCompanySchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    subCompanyName: String,
    subCompanyRegistrationNumber: String,
    subCompanybankAccountNumber: String,
    subCompanyAddress: String,
    subCompanyAdditionalDetails: String,
    subCompanyAppreciationDetails: String,
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
