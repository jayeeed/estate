const AllProperty = require("../models/propertyModel");
const User = require("../models/userModel/userModel");
const Wishlists = require("../models/wishlistModel");
const { resReturn } = require("../utils/responseHelpers");

// add property
exports.addProperty = async (req, res, next) => {
  try {
    const property = await AllProperty.create(req.body);
    await User.findByIdAndUpdate(
      req.body.userId,
      { type: "host" },
      { new: true }
    );
    return resReturn(res, 201, { property });
  } catch (error) {
    return resReturn(res, 500, { error: error.message });
  }
};

// add wishlists
exports.addWishlistsProperty = async (req, res, next) => {
  const { propertyId, userId } = req.body;
  console.log(propertyId);

  try {
    const property = await Wishlists.create(req.body);

    // await User.findByIdAndUpdate(
    //   req.body.userId,
    //   { type: "host" },
    //   { new: true }
    // );
    return resReturn(res, 201, { property });
  } catch (error) {
    return resReturn(res, 500, { error: error.message });
  }
};

// find property by use property id
exports.getWishlistsProperty = async (req, res, next) => {
  try {
    const { userId } = req.query;
    console.log(userId);
    const properties = await Wishlists.find({
       userId: userId 
      }).populate("propertyId", "title located images price review");
    console.log(properties);

    if (!properties) {
      return resReturn(res, 404, { error: "Property not found in WishLists" });
    }

    return resReturn(res, 200, { properties });
  } catch (error) {
    return resReturn(res, 500, { error: error.message });
  }
  properties;
};

exports.deletePropertyfromWishlist = async (req, res, next) => {
  //const { userId } = req;
  const { propertyId, userId } = req.query;
  console.log(userId);
  //const { propertyId } = req.params;
  try {
    const wishlist = await Wishlists.findOneAndDelete({ userId, propertyId });
    if (!wishlist){
      return res.json(" not found");
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Wishlist deleted successfully",
        data: wishlist,
      });

    // res.status(204).send(); // No Content response (HTTP status code 204)
  } catch (error) {
    next(error);
    // Pass the error to the error handling middleware (`errorHandler`) for further processing and response generation.
  }
};

// get all properties
exports.getAllProperties = async (req, res, next) => {
  try {
    const properties = await AllProperty.find().populate("placeDescribesId");
    // const properties = await AllProperty.find().populate("placeDescribesId").populate("review", "overAllRating");
    return resReturn(res, 200, { properties });
  } catch (error) {
    return resReturn(res, 500, { error: error.message });
  }
};

// find properties by user id
exports.getUserProperties = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const properties = await AllProperty.find({
      userId,
      status: { $ne: "disabled" },
    });
    return resReturn(res, 200, { properties });
  } catch (error) {
    return resReturn(res, 500, { error: error.message });
  }
};

// find property by use property id
exports.getProperty = async (req, res, next) => {
  try {
    const propertyId = req.params.id;
    const property = await AllProperty.findById(propertyId);

    if (!property) {
      return resReturn(res, 404, { error: "Property not found" });
    }

    return resReturn(res, 200, { property });
  } catch (error) {
    return resReturn(res, 500, { error: error.message });
  }
};

// find property with all details
exports.getPropertyAllDetails = async (req, res, next) => {
  try {
    const propertyId = req.params.id;
    const property = await AllProperty.findById(propertyId)
      .populate("userId") // Populate the userId field
      .populate("placeDescribesId") // Populate the placeDescribesId field
      .populate("typeOfPlaceId") // Populate the typeOfPlaceId field
      .populate("amenitiesIds"); // Populate the amenitiesIds field

    if (!property) {
      return resReturn(res, 404, { error: "Property not found" });
    }

    return resReturn(res, 200, { property });
  } catch (error) {
    return resReturn(res, 500, { error: error.message });
  }
};

// Query properties where status is "active"
exports.getActiveProperties = async (req, res, next) => {
  try {
    const activeProperties = await AllProperty.find({ status: "active" });

    return resReturn(res, 200, { activeProperties });
  } catch (error) {
    return resReturn(res, 500, { error: error.message });
  }
};

// Update property
exports.updateProperty = async (req, res, next) => {
  try {
    const propertyId = req.params.id;
    const updatedData = req.body;
    //console.log(updatedData)

    // Ensure that userId is not updated (assuming userId should not be changed)
    delete updatedData.userId;

    const property = await AllProperty.findByIdAndUpdate(
      propertyId,
      updatedData,
      { new: true }
    );

    if (!property) {
      return resReturn(res, 404, { error: "Property not found" });
    }

    return resReturn(res, 200, { property });
  } catch (error) {
    return resReturn(res, 500, { error: error.message });
  }
};

// Delete property by ID
exports.deleteProperty = async (req, res, next) => {
  try {
    const propertyId = req.params.id;

    const property = await AllProperty.findByIdAndDelete(propertyId);

    if (!property) {
      return resReturn(res, 404, { error: "Property not found" });
    }

    return resReturn(res, 204); // 204 means No Content (successful deletion with no response body)
  } catch (error) {
    return resReturn(res, 500, { error: error.message });
  }
};
