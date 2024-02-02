// CompanyProfileEditForm.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const CompanyProfileEditForm = () => {
//   const { companyId } = useParams(); // Assumes you have a route parameter for companyId
  const [companyData, setCompanyData] = useState({
    companyName: '',
    registrationNumber: '',
    newAddress: '',
    bankAccountNumber: '',
    additionalDetails: '',
  });

//   useEffect(() => {
//     // Fetch company data based on companyId
//     axios.get(`/api/companies/${companyId}`)
//       .then((response) => {
//         setCompanyData(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching company data:', error);
//       });
//   }, [companyId]);

  const handleInputChange = (field, value) => {
    setCompanyData({
      ...companyData,
      [field]: value,
    });
  };

//   const handleUpdate = () => {
//     // Update company data in the database
//     axios.put(`/api/companies/${companyId}`, companyData)
//       .then((response) => {
//         console.log('Company profile updated successfully:', response.data);
//         // Redirect or perform any other actions after successful update
//       })
//       .catch((error) => {
//         console.error('Error updating company profile:', error);
//       });
//   };

  return (
    <Container maxWidth="md">
      <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
        <Typography component="h1" variant="h5">
          Edit Company Profile
        </Typography>
        <form>
          {/* Render form fields for editing */}
          <TextField
            label="Company Name"
            fullWidth
            margin="normal"
            value={companyData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            required
          />
          <TextField
            label="Registration Number"
            fullWidth
            margin="normal"
            value={companyData.registrationNumber}
            onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
            required
          />
          {/* Add other fields as needed */}
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            sx={{ mt: 3 }}
          >
            Update Profile
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CompanyProfileEditForm;
