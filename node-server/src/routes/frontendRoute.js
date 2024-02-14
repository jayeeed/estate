const express = require("express");
const {
  amenities,
  typeOfPlace,
  getAllCategories,
  addCategory,
  deleteCategory,updateCategory,
} = require("../controllers/frontendController");
const router = express.Router();

router.get("/amenities", amenities);

router.get("/typeOfPlace", typeOfPlace);

router.get("/category", getAllCategories);
router.post("/category", addCategory);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

module.exports = router;
