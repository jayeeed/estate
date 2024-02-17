const SubCompanyModel = require("../models/subCompanyModel");

// Controller function to add a new sub-company
exports.addSubCompany = async (req, res, next) => {
  try {
    const subCompany = await SubCompanyModel.create(req.body);
    return res
      .status(201)
      .json({ message: "Sub-company added successfully", subCompany });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Controller function to get all sub-companies
exports.getAllSubCompanies = async (req, res, next) => {
  try {
    const subCompanies = await SubCompanyModel.find();
    return res.status(200).json(subCompanies);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Controller function to get sub-companies belonging to a main company
exports.getSubCompaniesByCompanyId = async (req, res, next) => {
  const companyId = req.params.companyId;
  try {
    const subCompanies = await SubCompanyModel.find({ companyId });
    return res.status(200).json(subCompanies);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Controller function to get sub-company by ID
exports.getSubCompanyById = async (req, res, next) => {
  const subCompanyId = req.params.subCompanyId;
  try {
    const subCompany = await SubCompanyModel.findById(subCompanyId);
    if (!subCompany) {
      return res.status(404).json({ message: "Sub-company not found" });
    }
    return res.status(200).json(subCompany);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Controller function to update a sub-company by ID
exports.updateSubCompany = async (req, res, next) => {
  const subCompanyId = req.params.subCompanyId;
  try {
    const updatedSubCompany = await SubCompanyModel.findByIdAndUpdate(
      subCompanyId,
      req.body,
      { new: true }
    );
    if (!updatedSubCompany) {
      return res.status(404).json({ message: "Sub-company not found" });
    }
    return res.status(200).json({
      message: "Sub-company updated successfully",
      subCompany: updatedSubCompany,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Controller function to delete a sub-company by ID
exports.deleteSubCompany = async (req, res, next) => {
  const subCompanyId = req.params.subCompanyId;
  try {
    const deletedSubCompany = await SubCompanyModel.findByIdAndDelete(
      subCompanyId
    );
    if (!deletedSubCompany) {
      return res.status(404).json({ message: "Sub-company not found" });
    }
    return res
      .status(200)
      .json({ message: "Sub-company deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
