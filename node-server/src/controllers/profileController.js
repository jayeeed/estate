const Income = require("../models/fileModel");
const User = require("../models/userModel/userModel");
const { v4: uuidv4 } = require("uuid");
const fs = require('fs');
const path = require('path');
const { Binary } = require('mongodb');

// exports.updateUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const avatar = {
//       public_id: 'default',
//       url: req.file.buffer.toString('base64'),
//     };
//     const user = await User.findByIdAndUpdate(req.params.id, { name, email, password, avatar }, { new: true });
//     res.status(200).json({ message: 'User updated successfully', user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };




exports.uploadAvatar = async (req, res, next) => {
  const { file, userId } = req.body;
  console.log(userId);
  console.log(req.file);
  //console.log(req.avatar);

  try {
    const filePath = req.file.path;
    const fileName = req.file.originalname;
    
    const fileData = fs.readFileSync(filePath);
    const binaryData = new Binary(fileData);
    
    const image = {
      public_id: uuidv4(),
      name: fileName,
      url: `data:${req.file.mimetype};base64,${binaryData.toString('base64')}`,
    };
    // if (!file || !file.buffer) {
    //   return res.status(400).json({ message: "File data is missing" });
    // }
    const avatarPic = {
      public_id: uuidv4(),
      url: req.file.path,
    };

    const mongores = await User.findByIdAndUpdate(
      userId,
      { $set: {avatar: image } },
      { new: true }
    );

    //user.avatar.url = imageUrl;

    res.status(200).json(mongores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.personalInfoRouter = async (req, res) => {
  const { userId, values } = req.body;
  //const { userId } = req.body;
  console.log(userId);
  try {
    const mongores = await User.findByIdAndUpdate(
      userId,
      { $set: { personalInfo: values } },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Server returned Saved, updatePersonalInfo", mongores });
  } catch (err) {
    console.error(err);
    console.log(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addAboutInfo = async (req, res) => {
  const { userId, values } = req.body;
  //  const { userId } = req.body;
  console.log(userId);
  try {
    const mongores = await User.findByIdAndUpdate(
      userId,
      { $set: { "personalInfo.about": values.aboutMe } },
      { new: false }
    );

    res
      .status(200)
      .json({ message: "Server returned Saved, updatePersonalInfo", mongores });
  } catch (err) {
    console.error(err);
    console.log(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};



//  /income-info
exports.addIncomeInfo = async (req, res) => {
  // const { file, values, userId } = req.body;
  //const {  } = req.body;
  // console.log(values);
  console.log(req.file);
  const { incomeSource, officeName, workplaceLocation } = req.body.values;

  // Create a new instance of the Income model


  try {
    const filePath = req.file.path;
    const fileName = req.file.originalname;
    
    const fileData = fs.readFileSync(filePath);
    const binaryData = new Binary(fileData);
    
    const image = {
      public_id: uuidv4(),
      name: fileName,
      url: `data:${req.file.mimetype};base64,${binaryData.toString('base64')}`,
    };

    const newIncome = new Income({
      incomeSource,
      officeName,
      workplaceLocation,
      file: image,
    });


    const mongores = await User.findByIdAndUpdate(
      req.body.userId,
      { $set: { incomeSources: newIncome } },
      { new: false }
    );

    //  try {
    //    const mongores = await User.findByIdAndUpdate(
    //        userId,
    //        { $set: { "personalInfo.incomeSources": newIncome } },
    //        { new: false },
    //    );

    res
      .status(200)
      .send("Object saved successfully to MongoDB")
      .json({ message: "Server returned Saved, addIncomeInfo", mongores });
  } catch (err) {
    console.error(err);
    console.log(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// /address-info
exports.addressHistoryInfo = async (req, res) => {
  const { userId, values } = req.body;
  //  const { userId } = req.body;
  console.log(userId);
  try {
    const mongores = await User.findByIdAndUpdate(
      userId,
      { $set: { "personalInfo.addressHistory": values } },
      { new: false }
    );

    res
      .status(200)
      .json({ message: "Server returned Saved, addressHistoryInfo", mongores });
  } catch (err) {
    console.error(err);
    console.log(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// /emergency-info
exports.emergencyContactInfo = async (req, res) => {
  const { userId, values } = req.body;
  //  const { userId } = req.body;
  console.log(userId);
  try {
    const mongores = await User.findByIdAndUpdate(
      userId,
      { $set: { "personalInfo.emergencyContact": values } },
      { new: false }
    );

    res.status(200).json({
      message: "Server returned Saved, emergencyContactInfo",
      mongores,
    });
  } catch (err) {
    console.error(err);
    console.log(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const yourSchema = new Schema({
//   name: String,
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   file: Buffer
// });

// const YourModel = mongoose.model('YourModel', yourSchema);

exports.addAdressHistoryInfo = async (req, res) => {
  const { userId, values } = req.body;
  //const { userId } = req.body;
  console.log(userId);
  try {
    const mongores = await User.findByIdAndUpdate(
      userId,
      { $set: { "personalInfo.adressHistory": values } },
      { new: false }
    );

    res
      .status(200)
      .json({ message: "Server returned Saved, updatePersonalInfo", mongores });
  } catch (err) {
    console.error(err);
    console.log(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


//  const multer = require('multer');
//  const storage = multer.diskStorage({
//    destination: function (req, file, cb) {
//      cb(null, 'uploads/')
//    },
//  });
//  const upload = multer({ storage: storage });
//  const bufferSchema = require('mongoose-buffer').bufferSchema;
//  const Buffer = require('mongoose-buffer').types.Buffer;
//  const mongooseBufferPlugin = require('mongoose-buffer').plugin;
//  const mongoose = require('mongoose');
//  mongoose.plugin(mongooseBufferPlugin);

//  // Create a new instance of the Income model with a `file` field of type `Buffer` using the `bufferSchema` provided by `mongoose-buffer` package
//  const newIncome = new Income({
//    incomeSource: values.incomeSource,
//    officeName: values.officeName,
//    workplaceLocation: values.workplaceLocation,
//    file: Buffer(fs.readFileSync(req.file.path)), // Read the uploaded file and save it as a Buffer object to the `file` field of the new income document
//  });