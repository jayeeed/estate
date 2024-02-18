const PostJobModel = require("../models/postJobModel");

// Controller function to create a new job posting
exports.createJob = async (req, res, next) => {
  try {
    const {
      companyId,
      jobTitle,
      companyName,
      location,
      startDate,
      description,
    } = req.body;

    const job = await PostJobModel.create({
      companyId,
      jobTitle,
      companyName,
      location,
      startDate,
      description,
    });

    return res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Controller function to get all job postings
exports.getAllJobs = async (req, res, next) => {
  try {
    const jobs = await PostJobModel.find();
    return res.status(200).json(jobs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Controller function to get job by ID
exports.getJobById = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    const job = await PostJobModel.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json(job);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Controller function to update job by ID
exports.updateJob = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    const update = req.body;
    const options = { new: true };

    const updatedJob = await PostJobModel.findByIdAndUpdate(
      jobId,
      update,
      options
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res
      .status(200)
      .json({ message: "Job updated successfully", job: updatedJob });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Controller function to delete job by ID
exports.deleteJob = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    const deletedJob = await PostJobModel.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
