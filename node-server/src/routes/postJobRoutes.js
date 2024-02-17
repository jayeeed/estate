const express = require("express");
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/postJobController");

const router = express.Router();

router.post("/create-job", createJob);
router.get("/get-all-jobs", getAllJobs);
router.get("/get-job/:jobId", getJobById);
router.put("/update-job/:jobId", updateJob);
router.delete("/delete-job/:jobId", deleteJob);

module.exports = router;
