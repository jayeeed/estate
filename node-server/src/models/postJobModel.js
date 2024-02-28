const mongoose = require("mongoose");

const postJobSchema = new mongoose.Schema(
  {
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    // companyName: {
    //   type: String,
    //   required: true,
    // },
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

const PostJobModel = mongoose.model("PostJob", postJobSchema);

module.exports = PostJobModel;
