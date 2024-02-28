import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Typography, Grid, TextField } from "@mui/material";
// import axios from "axios";
import { postApi } from "../../config/configAxios";


// eslint-disable-next-line react/prop-types
const JobPostForm = ({ onClose, companyId, hostId }) => {
  const [jobTitle, setJobTitle] = useState("");
  // const [company, setCompany] = useState("");
  const [jobLocation, setLocation] = useState("");
  const [jobStartDate, setStartDate] = useState(null);
  const [jobDescription, setjobDescription] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!jobTitle.trim()) {
      errors.jobTitle = "Job title is required";
    }
    // if (!company.trim()) {
    //   errors.company = "Company name is required";
    // }
    if (!jobLocation.trim()) {
      errors.jobLocation = "Location is required";
    }
    if (!jobStartDate) {
      errors.jobStartDate = "Start date is required";
    }
    if (!jobDescription.trim()) {
      errors.jobDescription = "jobDescription is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };



//   router.post("/create-job", createJob);
// router.get("/get-all-jobs", getAllJobs);
// router.get("/get-job/:jobId", getJobById);
// router.put("/update-job/:jobId", updateJob);
// router.delete("/delete-job/:jobId", deleteJob);



  const handleJobSubmit = () => {
    if (validateForm()) {
      const jobData = {hostId, jobTitle, companyId, jobLocation, jobStartDate, jobDescription };
      // Perform Axios POST request
      postApi("/create-job", jobData)
        .then((response) => {
          // Handle the successful response, if needed
          console.log("Job posted successfully:", response.data);
          // Close the popup
          onClose();
        })
        .catch((error) => {
          // Handle the error, if needed
          console.error("Error posting job:", error);
          // Close the popup
          onClose();
        });
    }
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle textAlign={"center"}>
        <Typography variant="h3">Create a Job Post</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={8}>
            <TextField
              autoFocus
              margin="dense"
              id="jobTitle"
              label="Job Title"
              type="text"
              variant="outlined"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              fullWidth
              error={!!errors.jobTitle}
              helperText={errors.jobTitle}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                margin="dense"
                id="jobStartDate"
                label="Start Date"
                variant="outlined"
                value={jobStartDate}
                onChange={(date) => setStartDate(date)}
                renderInput={(params) => (
                  <TextField
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& input:valid + fieldset": {
                          borderRadius: 8,
                        },
                      },
                    }}
                    {...params}
                    variant="outlined"
                  />
                )}
                fullWidth
                error={!!errors.jobStartDate}
                helperText={errors.jobStartDate}
              />
            </LocalizationProvider>
          </Grid>
          {/* <Grid item xs={12} md={8}>
            <TextField
              margin="dense"
              id="company"
              label="Company"
              type="text"
              variant="outlined"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              fullWidth
              error={!!errors.company}
              helperText={errors.company}
            />
          </Grid> */}
          <Grid item xs={12} md={8}>
            <TextField
              margin="dense"
              id="jobLocation"
              label="jobLocation"
              type="text"
              variant="outlined"
              value={jobLocation}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
              error={!!errors.jobLocation}
              helperText={errors.jobLocation}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              margin="dense"
              id="jobDescription"
              label="Job Description"
              type="text"
              multiline
              rows={4}
              variant="outlined"
              value={jobDescription}
              onChange={(e) => setjobDescription(e.target.value)}
              fullWidth
              error={!!errors.jobDescription}
              helperText={errors.jobDescription}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleJobSubmit} color="primary" variant="outlined">
          Post Job
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JobPostForm;
