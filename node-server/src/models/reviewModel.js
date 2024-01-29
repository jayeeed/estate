const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AllProperty",
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reviewMessage: String,
    // rating: Number,
    CommunicationRating: Number,
    RecommendRating: Number,
    ServicesRating: Number,
    LocationRating: Number,
    overAllRating: Number,
  },
  {
    timestamps: true,
  }
);

const Reviews = mongoose.model("Reviews", reviewSchema);

module.exports = Reviews;
