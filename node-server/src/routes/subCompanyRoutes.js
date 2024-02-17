const express = require("express");
const {
  addSubCompany,
  getAllSubCompanies,
  getSubCompaniesByCompanyId,
  getSubCompanyById,
  deleteSubCompany,
  updateSubCompany,
} = require("../controllers/subCompanyController");
const router = express.Router();

router.post("/add-sub-company", addSubCompany);
router.get("/getAllSubCompanies", getAllSubCompanies);
router.get("/company/sub-companies/:companyId", getSubCompaniesByCompanyId);
router.get("/edit/sub-company/:subCompanyId", getSubCompanyById);

// Route for updating a sub-company by ID
router.put("/sub-companies/:subCompanyId", updateSubCompany);
// Route for deleting a sub-company by ID
router.delete("/sub-companies/:subCompanyId", deleteSubCompany);

module.exports = router;
