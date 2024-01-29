const express = require("express");
const { storeReviews, updateReviewStatus, getReview } = require("../controllers/reviewController");
const router = express.Router();

// Define a route for the `getBookingData` function and map it to the new router:
router.post("/reviews", storeReviews);
router.post("/reviewStatusUpdate", updateReviewStatus);
router.get("/getReviews",getReview);


module.exports = router;
 