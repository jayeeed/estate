const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    invoiceId: Number,
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
    renterUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    hostUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AllProperty",
    },
    renterName: String,
    renterEmail: String,
    renterPhoneNumber: Number,

    hostName: String,
    hostEmail: String,
    hostPhoneNumber: Number,

    startDate: Date,
    endDate: Date,
    stayDays: Number,
    adults: Number,
    children: Number,
    infants: Number,
    pets: Number,
    addressLine1: String,
    city: String,
    country: String,
    postalCode: String,
    status: String,
    reviewStatus: String,
    
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
