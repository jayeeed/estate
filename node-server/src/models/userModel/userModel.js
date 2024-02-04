const mongoose = require("mongoose");
const validator = require("validator");
// const personalInfoSchema = require("./personalInfo");


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: { 
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    personalInfo: {
      type: Object,
      default: () => ({}),
    },
    
    role: {
      type: String,
      default: "user",
    },
    status: {
      type: String,
      default: "active",
    },
    type: {
      type: String,
      default: "renter",
    },
    verificationOTP: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    otpExpiration: {
      type: Date,
    },
    resetPasswordOTP: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    }, 
  },
 
  {
    timestamps: true,
  }
);

userSchema.pre('save', function(next) {
  if (!this.avatar.url && this.req.file) {
    this.avatar.url = this.req.file.buffer.toString('base64');
  }
  next();
});

module.exports = mongoose.model("User", userSchema);