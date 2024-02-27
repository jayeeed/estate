const mongoose = require("mongoose");

const postJobIssueSchema = new mongoose.Schema(
  {
    renterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AllProperty",
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    jobLocation: {
      type: String,
      required: true,
    },
    jobStartDate: {
      type: Date,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PostJobIssueModel = mongoose.model("PostJobIssue", postJobIssueSchema);

module.exports = PostJobIssueModel;
