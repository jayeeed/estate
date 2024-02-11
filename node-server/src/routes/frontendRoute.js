const express = require("express");
const { amenities, typeOfPlace, placeDescribe} = require("../controllers/frontendController");
const router = express.Router();

router.get("/amenities", amenities);

router.get("/category", placeDescribe);
router.get("/typeOfPlace", typeOfPlace);

module.exports = router;
