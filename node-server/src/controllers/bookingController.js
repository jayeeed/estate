const Booking = require("../models/bookingModel");
const User = require("../models/userModel/userModel");
const Payment = require("../models/paymentModel");
const Property = require("../models/propertyModel");

const today = new Date(); // Get today's date

exports.getBookingData = async (req, res) => {
  const { userId } = req.query;
  console.log(userId, "------");

  try {
    const data = await Booking.find({
      hostUserId: userId,
      // propertyId: propertyId,
      startDate: {
        $lte: today,
      },
      endDate: { 
        $gte: today,
      },
    })
      .populate("paymentId", "status createdAt") // populate payment collection fields using
      .populate("propertyId", "title  address.addressLine1 images") // populate property fields  images
      //.lean() // return plain JavaScript object instead of mongoose document
      .select({
        invoiceId: 1,
        startDate: 1,
        endDate: 1,
        status: 1,
        stayDays: 1,
        adults: 1,
        children: 1,
        infants: 1,
        pets: 1,
        city: 1,
        renterName: 1,
        renterEmail: 1, 
        paymentId: 1,
        propertyId: 1,
        status: 1,
      });

    res.json(data);
    // console.log(data);
  } catch (err) {
    console.error(err);
    console.log(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getRenterBookingData = async (req, res) => {
  const { userId } = req.query;
  console.log(userId, "------");

  try {

    // const data = await Review.find({ $and: [{ userId: userId }, { rating: { $gte: rating } }]}) {
    //   console.error(err);
    //   console.log(err.message);
    //   res.status(500).json({ message: "Internal server error" });
    // }


    const data = await Booking.find({
      renterUserId: userId, 
      // reviewStatus: { $ne: "reviewed" },
    })
      .populate("propertyId", "title address.addressLine1 address.city address.state address.postalCode images") // populate property fields  images
      //.lean() // return plain JavaScript object instead of mongoose document
      .select({
        _id:1,
        stayDays: 1,
        propertyId: 1,
        reviewStatus: 1,
      });

    res.json(data);
    //console.log(data);
  } catch (err) {
    console.error(err);
    console.log(err.message);
    res.status(500).json({ message: "Internal server error" });
  }


}


exports.getActiveRentingData = async (req, res) => {
  const { renterId } = req.query;
  try {
    const data = await Booking.find({
      renterUserId: renterId,
      startDate: { $lte: new Date() }, // only show bookings with checkin date in the past or today
      endDate: { $gte: new Date() }, // only show bookings with checkout date in the future or today
      reviewStatus: { $ne: "reviewed" }, // exclude bookings with reviewed status
    })
      .populate("propertyId", "title address.addressLine1 address.city address.state address.postalCode images") // populate property fields including images
      .select({
        _id: 1,
        stayDays: 1,
        propertyId: 1,
        reviewStatus: 1,
      });
    res.json(data);
  } catch (err) {
    console.error(err);
    console.log(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};



exports.getUpcomingRentingData = async (req, res) => {
  const { renterId } = req.query;
  try {
    const data = await Booking.find({
      renterUserId: renterId,
      startDate: { $gt: new Date() }, 
      reviewStatus: { $ne: "reviewed" }, // exclude bookings with reviewed status
    })
      .populate("propertyId", "title address.addressLine1 address.city address.state address.postalCode images") // populate property fields including images
      .select({
        _id: 1,
        stayDays: 1,
        propertyId: 1,
        reviewStatus: 1,
      });
    res.json(data);
  } catch (err) {
    console.error(err);
    console.log(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};













exports.updatebookingStatus = async (req, res) => {
  const { bookingId } = req.body;
  console.log(bookingId, "-----------------");


  try {
    const mongores = await Booking.findByIdAndUpdate(
      bookingId,
      { $set: { status: "active" } },
      { new: true }
    );


  } catch (err) {
    console.error(err);
    console.log(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};



exports.deleteBooking = async (req, res) => {
  const { bookingId } = req.body;
  
  try {
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);
    
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    
    res.status(200).json({ message: "Booking successfully deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};























//console.log(mongores)

    // if(!mongores.invoiceId === invoiceId){
    //   res.json({"mesesage":"Booking not Found"},400)
    // }else{
    //   //res.json({"mesesage":"Booking verified"},200)
    //   res.status(200).json({ message: "Booking verified" });
    // }


    //console.log(mongores);
    //res.json(mongores)





// hostUserId: { $arrayElemAt: ["$hostUserId.name", 0] },
// hostEmail: { $arrayElemAt: ["$hostUserId.email", 0] },

// const { MongoClient } = require("mongodb");

// const uri =
//   "mongodb+srv://ukbd:MNjqO714lSWx6le5@uk-bd-00.kt2fhlb.mongodb.net/uk-bd";

// // Define the MongoDB collections you need to query
// const bookingsCollectionName = "bookings";
// const usersCollectionName = "users";
// const paymentsCollectionName = "payments";
// const propertiesCollectionName = "allproperties";

// async function getBookingData(req, res) {
//   const { userId, propertyId } = req.query;

//   const client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   try {
//     await client.connect();

//     if (client.connect()) {
//       console.log("conncted");
//     }

//     const database = client.db("airbnb");
//     const bookingsCollection = database.collection(bookingsCollectionName);

//     // const usersCollection = database.collection(usersCollectionName);
//     // const paymentsCollection = database.collection(paymentsCollectionName);
//     // const propertiesCollection = database.collection(propertiesCollectionName);

//     const data = await bookingsCollection
//       .aggregate([
//         {
//           $match: { userId: userId, propertyId: propertyId },
//         },
//         {
//           $lookup: {
//             from: usersCollectionName,
//             localField: "userId",
//             foreignField: "_id",
//             as: "user",
//           },
//         },
//         {
//           $lookup: {
//             from: paymentsCollectionName,
//             localField: "paymentId",
//             foreignField: "_id",
//             as: "payment",
//           },
//         },
//         {
//           $lookup: {
//             from: propertiesCollectionName,
//             localField: "propertyId",
//             foreignField: "_id",
//             as: "property",
//           },
//         },
//         {
//           $project: {
//             _id: 0,
//             paymentid: { $toString: "$paymentId" },
//             username: { $arrayElemAt: ["$user.name", 0] },
//             email: { $arrayElemAt: ["$user.email", 0] },
//             booking_startdate: {
//               $dateToString: { format: "%Y-%m-%d", date: "$startDate" },
//             },
//             booking_enddate: {
//               $dateToString: { format: "%Y-%m-%d", date: "$endDate" },
//             },
//             payment_created_At: { $arrayElemAt: ["$payment.created_At", 0] },
//             property_name: { $arrayElemAt: ["$property.title", 0] },
//             property_address: { $arrayElemAt: ["$property.address", 0] },
//           },
//         },
//         {
//           $limit: 15,
//         },
//       ])
//       .toArray();

//     res.json(data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   } finally {
//     await client.close();
//   }
// }

// To use Mongoose to create a relation between collections and retrieve data from them, you can define your schema models in Mongoose, and then use `populate` and `select` methods while querying the data to get the desired data from the referenced collections. Here's an example of using Mongoose to retrieve data from multiple collections based on referenced ObjectId:

// ```
// const Booking = require("../models/Booking");
// const User = require("../models/User");
// const Payment = require("../models/Payment");
// const Property = require("../models/Property");

// exports.getBookingData = async (req, res) => {
//   const { userId, propertyId } = req.query;

//   try {
//     const data = await Booking
//       .find({ userId, propertyId })
//       .populate("userId", "-_id name email") // populate user collection fields using select option
//       .populate("paymentId", "-_id created_At") // populate payment collection fields using select option
//       .populate("propertyId", "-_id title address") // populate property collection fields using select option
//       .lean() // return plain javascript object instead of mongoose document
//       .limit(15);

//     res.json(data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
// ```

// Note that in the above code, the following collection schema models are used:

// module.exports = Booking;
// ```

// ```

// Note that you can use the `select` method while populating a document to get only the fields/data that you need from the referenced collection.
