const CompanyModel = require("../models/companyModel");

// Controller function to add a new company
const addCompany = async (req, res) => {
  try {
    const company = new CompanyModel(req.body);
    await company.save();
    res.status(201).json({ message: "Company added successfully", company });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding company", error: error.message });
  }
};

// Controller function to get all companies
const getAllCompanies = async (req, res) => {
  try {
    const companies = await CompanyModel.find();
    res.status(200).json(companies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting companies", error: error.message });
  }
};

// Controller function to get companies belonging to a user
const getUserCompanies = async (req, res) => {
  const userId = req.params.id;
  try {
    const companies = await CompanyModel.find({ userId });
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({
      message: "Error getting user's companies",
      error: error.message,
    });
  }
};

// Controller function to get company by ID
const getCompany = async (req, res) => {
  const companyId = req.params.id;
  try {
    const company = await CompanyModel.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting company", error: error.message });
  }
};

// Controller function to update a company by ID
const updateCompany = async (req, res) => {
  const companyId = req.params.id;
  try {
    const updatedCompany = await CompanyModel.findByIdAndUpdate(
      companyId,
      req.body,
      { new: true }
    );
    if (!updatedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json({
      message: "Company updated successfully",
      company: updatedCompany,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating company", error: error.message });
  }
};

// Controller function to delete a company by ID
const deleteCompany = async (req, res) => {
  const companyId = req.params.id;
  try {
    const deletedCompany = await CompanyModel.findByIdAndDelete(companyId);
    if (!deletedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting company", error: error.message });
  }
};

module.exports = {
  addCompany,
  getAllCompanies,
  getUserCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
};
