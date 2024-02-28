// RaisedIssues
import DashboardLayout from "../../layouts/hostDashboard";
//       <DashboardLayout title={"companyName info"}>

// Dummy data for the tables
//   const allIssues = [
//     { id: 1, title: 'Water Leak in Kitchen', status: 'Open' },
//     { id: 2, title: 'Broken Window in Living Room', status: 'Closed' },
//     { id: 3, title: 'Heating System Not Working', status: 'Open' },
//     { id: 4, title: 'Clogged Drain in Bathroom', status: 'Open' },
//     { id: 5, title: 'Roof Leakage in Bedroom', status: 'Closed' },
//     // Add more issues as needed
//   ];

//   const openIssues = allIssues.filter((issue) => issue.status === 'Open');
//   const closedIssues = allIssues.filter((issue) => issue.status === 'Closed');

// RaisedIssues
import { useState } from "react";
import Box from "@mui/material/Box";
// import CardMedia from '@mui/material/CardMedia';
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { TableContainer, TextField } from "@mui/material";
import axios from "axios";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Custom TabPanel component
// eslint-disable-next-line react/prop-types
const CustomTabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const allIssues = [
  { id: 1, title: "Water Leak in Kitchen", status: "Open" },
  { id: 2, title: "Broken Window in Living Room", status: "Closed" },
  { id: 3, title: "Heating System Not Working", status: "Open" },
  { id: 4, title: "Clogged Drain in Bathroom", status: "Open" },
  { id: 5, title: "Roof Leakage in Bedroom", status: "Closed" },
  // Add more issues as needed
];

// Dummy data for open issues
const openIssues = [
  {
    id: 1,
    title: "Water Leak in Kitchen",
    status: "Open",
    details:
      "Water is leaking from the kitchen sink. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis aliquam hic nostrum eum voluptatem dolores placeat itaque omnis saepe cumque! Temporibus doloremque reiciendis odio consectetur delectus dolorum incidunt, asperiores saepe!",
  },
  {
    id: 3,
    title: "Heating System Not Working",
    status: "Open",
    details:
      "Heating system is not producing heat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis aliquam hic nostrum eum voluptatem dolores placeat itaque omnis saepe cumque! Temporibus doloremque reiciendis odio consectetur delectus dolorum incidunt, asperiores saepe!",
  },
  {
    id: 4,
    title: "Clogged Drain in Bathroom",
    status: "Open",
    details:
      "Bathroom drain is clogged and not draining properly. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis aliquam hic nostrum eum voluptatem dolores placeat itaque omnis saepe cumque! Temporibus doloremque reiciendis odio consectetur delectus dolorum incidunt, asperiores saepe!",
  },
];

const closedIssues = allIssues.filter((issue) => issue.status === "Closed");

// eslint-disable-next-line react/prop-types
const RaisedIssues = ({ onClose }) => {
  const [value, setValue] = useState(0);
  const [review, setReview] = useState("");
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobStartDate, setJobStartDate] = useState(null);
  const [jobDescription, setJobDescription] = useState("");

  const handleJobTitleChange = (e) => {
    setJobTitle(e.target.value);
  };

  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handleJobLocationChange = (e) => {
    setJobLocation(e.target.value);
  };

  const handleJobStartDateChange = (date) => {
    setJobStartDate(date);
  };

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleJobSubmit = () => {
    // You can perform any necessary actions with the job details here
    console.log("Job posted:", {
      jobTitle,
      companyName,
      jobLocation,
      jobStartDate,
      jobDescription,
    });
    const jobData = {
      jobTitle,
      companyName,
      jobLocation,
      jobStartDate,
      jobDescription,
    };
    // Perform Axios POST request
    axios
      .post("YOUR_API_ENDPOINT", jobData)
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
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenDrawer = (issue) => {
    setSelectedIssue(issue);
  };

  const handleCloseDrawer = () => {
    setSelectedIssue(null);
  };

  const handleCloseIssue = (issueId) => {
    // Implement logic to close the issue
    const updatedIssues = allIssues.map((issue) =>
      issue.id === issueId ? { ...issue, status: "Closed" } : issue
    );

    // Update the state or send the updated issues to the server
    // setAllIssues(updatedIssues);

    // Close the drawer after closing the issue
    handleCloseDrawer();
  };
  return (
    <DashboardLayout title={"Raised issues"}>
      <Box>
        {/* ... (Banner, Avatar, etc.) */}

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="issue tabs">
            <Tab label="All Issues" />
            <Tab label="Open Issues" />
            <Tab label="Closed Issues" />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          {/* Content for "All Issues" */}
          <Typography variant="h4" className="title">
            All Issues
          </Typography>
          <TableContainer component={Paper} sx={{ marginBlock: 3 }}>
            <Table>
              <TableBody>
                {allIssues.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell>{issue.title}</TableCell>
                    <TableCell>
                      {issue.status === "Open" && (
                        <Button
                          variant="outlined"
                          onClick={() => handleCloseIssue(issue.id)}
                        >
                          Close
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          {/* Content for "Open Issues" */}
          <Typography variant="h4" className="title">
            Open Issues
          </Typography>
          <TableContainer component={Paper} sx={{ marginBlock: 3 }}>
            <Table marginBlock={3}>
              <TableBody>
                {openIssues.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell>{issue.title}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => handleOpenDrawer(issue)}
                      >
                        Post a job
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          {/* Content for "Closed Issues" */}
          <Typography variant="h4" className="title">
            Closed Issues
          </Typography>
          <TableContainer component={Paper} sx={{ marginBlock: 3 }}>
            <Table marginBlock={3}>
              <TableBody>
                {closedIssues.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell>{issue.title}</TableCell>
                    <TableCell>{issue.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomTabPanel>

        {/* Drawer for issue details and review form */}
        <Drawer
          anchor="right"
          open={selectedIssue !== null}
          onClose={handleCloseDrawer}
        >
          <Box p={3} style={{ width: "20vw" }}>
            <Typography variant="h6" gutterBottom>
              {selectedIssue?.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {selectedIssue?.details}
            </Typography>
            {/* Review Form */}
            <Typography variant="h6" gutterBottom>
              Overview Summery
            </Typography>
            <TextField
              label="Your problem, and urgency or something you want to mention"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <br />
            <TextField
              autoFocus
              margin="dense"
              id="jobTitle"
              label="Job Title"
              type="text"
              variant="outlined"
              value={jobTitle}
              onChange={handleJobTitleChange}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                margin="dense"
                sx={{ marginTop: 1 }}
                id="jobStartDate"
                label="Start Date"
                variant="outlined"
                value={jobStartDate}
                onChange={handleJobStartDateChange}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
              />
            </LocalizationProvider>
            <TextField
              margin="dense"
              id="companyName"
              label="companyName Id"
              type="text"
              fullWidth
              variant="outlined"
              value={companyName}
              onChange={handleCompanyNameChange}
            />
            <TextField
              margin="dense"
              id="jobLocation"
              label="jobLocation"
              type="text"
              fullWidth
              variant="outlined"
              value={jobLocation}
              onChange={handleJobLocationChange}
            />
            <TextField
              margin="dense"
              id="jobDescription"
              label="Job jobDescription"
              type="text"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={jobDescription}
              onChange={handleJobDescriptionChange}
            />
            <br />
            {/* Submit Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleJobSubmit}
            >
              Create Job
            </Button>{" "}
            {/* Close Button */}
            <Button variant="outlined" onClick={handleCloseDrawer}>
              Close
            </Button>
          </Box>
        </Drawer>
      </Box>
    </DashboardLayout>
  );
};

export default RaisedIssues;
