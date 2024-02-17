const express = require("express");
const {
  addCompany,
  getAllCompanies,
  getUserCompanies,
  getCompany,
  deleteCompany,
  updateCompany,
} = require("../controllers/companyController");
const router = express.Router();

router.post("/add-company", addCompany);
router.get("/getAllCompanies", getAllCompanies);
router.get("/user/companies/:id", getUserCompanies);
router.get("/edit/company/:id", getCompany);

// Route for updating a company by ID
router.put("/companies/:id", updateCompany);
// Route for deleting a company by ID
router.delete("/companies/:id", deleteCompany);

module.exports = router;
