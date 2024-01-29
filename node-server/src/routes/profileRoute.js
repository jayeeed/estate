const express = require("express");
const { uploadAvatar,personalInfoRouter, addAboutInfo, addIncomeInfo, addressHistoryInfo, emergencyContactInfo} = require("../controllers/profileController");
const router = express.Router();


const multer = require("multer");
const path = require("path");


// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Multer file filter
const fileFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// Multer upload middleware
const upload = multer({ storage: storage, fileFilter: fileFilter });



router.post("/users/avatar", upload.single('file'), uploadAvatar);
router.post("/personal-info", personalInfoRouter);
router.post("/about-info", addAboutInfo);
router.post("/income-info",upload.single('file'), addIncomeInfo);
router.post("/address-info", addressHistoryInfo);
router.post("/emergency-info", emergencyContactInfo);





module.exports = router;

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//       cb(
//         null,
//         `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//       );
//     },
//   });
