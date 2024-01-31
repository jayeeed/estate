const Reviews = require("../models/reviewModel.js");
const Booking = require("../models/bookingModel");

const today = new Date(); // Get today's date

exports.storeReviews = async (req, res) => {

  overAllRating =
    (req.body.CommunicationRating +
      req.body.RecommendRating +
      req.body.ServicesRating +
      req.body.LocationRating) /
    4;

  try {
    const data = await Reviews.create({
      propertyId: req.body.propertyId,
      reviewedBy: req.body.reviewedBy,
      reviewMessage: req.body.reviewMessage,
      CommunicationRating: req.body.CommunicationRating,
      RecommendRating: req.body.RecommendRating,
      ServicesRating: req.body.ServicesRating,
      LocationRating: req.body.LocationRating,
      overAllRating: overAllRating,
      // rating: req.body.rating,
    });
    res
      .status(200)
      .json({ message: "Server Okay, Reviews.created", reviw: data });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateReviewStatus = async (req, res) => {
  const { bookingId  } = req.body;
  console.log(bookingId, "-----------------");

  try {
    const mongores = await Booking.findByIdAndUpdate(
      bookingId,
      { $set: { reviewStatus: "reviewed" } },
      { new: true },
    );
    //console.log(mongores);

    // const booking = await Booking.findOne(
    //   {bookingId: bookingId});
    // if (!booking) {
    //   return res.status(404).json({ message: "booking not found" });
    // }
    // booking.reviewStatus = "reviewed";
    // await booking.save();
    // res.status(200).json({ message: "Review status updated successfully" });
    // console.log(mongores);
    res
      .status(200) 
      .json({ message: "Server Okay, updateReviewStatus", mongores });
  } catch (err) {
    console.error(err);
    console.log(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getReview = async (req, res) => {
  const { propertyId, limit, offset } = req.query;

  try {
    // const mongores = await Reviews.find({ propertyId: propertyId})
    // .populate("reviewedBy", "name avatar").limit(limit) ;


    const totalResults = await Reviews.countDocuments({ propertyId });
      const mongores = await Reviews.find({ propertyId }).populate("reviewedBy", "name avatar")
        .limit(limit)
        .skip(offset);
        // console.log(mongores);


    // const goodReviews = await Reviews.find({ propertyId: propertyId, overAllRating: { $gte: 4 } }, { _id: 0, reviewMessage: 1 }).sort({ rating: -1 }).limit(2);
    // const badReviews = await Reviews.find({ propertyId: propertyId, overAllRating: { $lt: 4 } }, { _id: 0, reviewMessage: 1 }).sort({ rating: 1 }).limit(2);
  
    // const allReviews = [...goodReviews, ...badReviews];

    res  
      .status(200)
      .json({
        message: "Server Okay, getting The all the reviews",
        reviws: mongores,totalResults
      });
  } catch (err) { 
    console.error(err);
    console.log(err.message); 
    res.status(500).json({ message: "Internal server error" });
  }
};
