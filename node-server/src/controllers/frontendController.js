const Amenities = require("../models/amenitiesModel");
const TypeOfPlace = require("../models/typeOfPlaceModel");
const { resReturn } = require("../utils/responseHelpers");

// get all amenites
exports.amenities = async (req, res, next) => {
  try {
    const amenities = await Amenities.find();
    return resReturn(res, 200, { amenities }); 
  } catch (error) {
    return resReturn(res, 500, {
      error: error.message,
    }); 
  }
};




  exports.placeDescribe = async (req, res, next) => {
    try {

      // Find amenities from the database based on the provided type
      const category = await Amenities.find({ "type":"describe" });
  
      // Return the found amenities
      return res.status(200).json({ category });
    } catch (error) {
      // Return an error response if there's an error during the database query
      return res.status(500).json({ error: error.message });
    }
  };
  

// get all typeOfPlace 
exports.typeOfPlace = async (req, res, next) => {
  try {
    const typeOfPlace = await TypeOfPlace.find();
    return resReturn(res, 200, { typeOfPlace });
  } catch (error) {
    return resReturn(res, 500, {
      error: error.message,
    });
  }
};
