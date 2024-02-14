/* eslint-disable no-undef */
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



exports.getAllCategories = async (req, res, next) => {
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



exports.addCategory = async (req, res) => {
  try {
    console.log(req.body)
    const category = new Amenities(req.body);
    await category.save();
    res.status(201,"category added").json(category);
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Amenities.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Update category controller
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { title, icon, type } = req.body;
    console.log(req.body);

    const updatedCategory = await Amenities.findByIdAndUpdate(id, { title, icon, type }, { new: true });

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Internal server error' });
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




// exports.getAllCategories = async (req, res) => {
//   try {
//     const categories = await Category.find();
//     res.json(categories);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
