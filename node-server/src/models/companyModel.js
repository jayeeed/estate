const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    companyName: String,
    registrationNumber: String,
    bankAccountNumber: String,
    address: String,
    additionalDetails: String,
    appreciationDetails: String,
    // logo: String,
    // banner: String,
  },
  {
    timestamps: true,
  }
);

const CompanyModel = mongoose.model("company", companySchema);

module.exports = CompanyModel;
