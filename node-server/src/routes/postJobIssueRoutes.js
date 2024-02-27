const express = require("express");
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/postJobIssueController");

const router = express.Router();

router.post("/create-job-issue", createJob);
router.get("/get-all-jobs-issue", getAllJobs);
router.get("/get-job-issue/:jobId", getJobById);
router.put("/update-job-issue/:jobId", updateJob);
router.delete("/delete-job-issue/:jobId", deleteJob);

module.exports = router;
