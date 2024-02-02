// RaisedIssues
import DashboardLayout from "../../layouts/hostDashboard";
//       <DashboardLayout title={"Company info"}>


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
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { TableContainer, TextField } from '@mui/material';

// Custom TabPanel component
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
    { id: 1, title: 'Water Leak in Kitchen', status: 'Open' },
    { id: 2, title: 'Broken Window in Living Room', status: 'Closed' },
    { id: 3, title: 'Heating System Not Working', status: 'Open' },
    { id: 4, title: 'Clogged Drain in Bathroom', status: 'Open' },
    { id: 5, title: 'Roof Leakage in Bedroom', status: 'Closed' },
    // Add more issues as needed
  ];

// Dummy data for open issues
const openIssues = [
  { id: 1, title: 'Water Leak in Kitchen', status: 'Open', 
  details: 'Water is leaking from the kitchen sink.' },
  { id: 3, title: 'Heating System Not Working', status: 'Open',
   details: 'Heating system is not producing heat.' },
  { id: 4, title: 'Clogged Drain in Bathroom', status: 'Open', 
  details: 'Bathroom drain is clogged and not draining properly.' },
];


  const closedIssues = allIssues.filter((issue) => issue.status === 'Closed');

const CompanyProfilePanels = () => {
  const [value, setValue] = useState(0);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [review, setReview] = useState('');
  const [donationAmount, setDonationAmount] = useState('');

  const handleReviewSubmit = () => {
    // Handle review submission logic here
    console.log('Submitted Review:', review);
    console.log('Donation Amount:', donationAmount);
    // You can add additional logic, e.g., send review to server
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
      issue.id === issueId ? { ...issue, status: 'Closed' } : issue
    );

    // Update the state or send the updated issues to the server
    // setAllIssues(updatedIssues);

    // Close the drawer after closing the issue
    handleCloseDrawer();
  };
  return (
    <DashboardLayout title={"Raised issues"}>
    <Box className='root'>
      {/* ... (Banner, Avatar, etc.) */}

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {allIssues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell>{issue.title}</TableCell>
                  <TableCell>
                    {issue.status === 'Open' && (
                      <Button variant="outlined" onClick={() => handleCloseIssue(issue.id)}>
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
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {openIssues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell>{issue.title}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => handleOpenDrawer(issue)}>
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
        <TableContainer component={Paper}>
          <Table>
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
 <Drawer anchor="right" open={selectedIssue !== null} onClose={handleCloseDrawer}>
        <Box p={3} style={{ width: '300px' }}>
          <Typography variant="h6" gutterBottom>
            {selectedIssue?.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {selectedIssue?.details}
          </Typography>

          {/* Review Form */}
          <Typography variant="h6" gutterBottom>
            Add Review
          </Typography>
          <TextField
            label="Your Review"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          {/* Donation Field */}
          <Typography variant="h6" gutterBottom>
            Make a Donation
          </Typography>
          <TextField
            label="Donation Amount ($)"
            variant="outlined"
            fullWidth
            type="number"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
          />

          {/* Submit Button */}
          <Button variant="contained" color="primary" onClick={handleReviewSubmit}>
            Submit Review
          </Button>

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

export default CompanyProfilePanels;
