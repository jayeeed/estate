import React, { useState, useEffect } from 'react';
import { getApi } from '../../config/configAxios'; 
import { Typography, Paper, Avatar, CardMedia } from '@mui/material';
import './pany.css'; // Import the external CSS file

const CompanyProfileView = () => {
  const [companyProfile, setCompanyProfile] = useState(null);

//   useEffect(() => {
//     // Fetch company profile data using Axios
//     getApi('/api/get-company-profile-data')
//       .then((data) => {
//         setCompanyProfile(data);
//       })
//       .catch((error) => {
//         console.error('Error fetching company profile data:', error);
//       });
//   }, []);

//   if (!companyProfile) {
//     return <p>Loading company profile data...</p>;
//   }

  return (
    <>
    <Paper elevation={3} className='root' backgroundColor= {"red"}>
      <CardMedia
        component="img"
        alt="Banner"
        height="140"
        // image={companyProfile.bannerUrl}  // Assuming you have a field for the banner URL in your company profile data
        className="banner"
      />
      <div className="content">
        <Avatar
        //   alt={companyProfile.companyName}
        //   src={companyProfile.logoUrl}  // Assuming you have a field for the logo URL in your company profile data
          className="avatar"
        />
        <Typography variant="h4" className="title">
          {/* {companyProfile.companyName} */}
        </Typography>
        <Typography variant="body1" className="details">
          {/* Registration Number: {companyProfile.registrationNumber} */}
        </Typography>
        <Typography variant="body1" className="details">
          {/* New Address: {companyProfile.newAddress} */}
        </Typography>
        <Typography variant="body1" className="details">
          {/* Bank Account Number: {companyProfile.bankAccountNumber} */}
        </Typography>
        <Typography variant="body1" className="details">
          {/* Additional Details: {companyProfile.additionalDetails} */}
        </Typography>
      </div>
    </Paper>

    </>
  );
};

export default CompanyProfileView;






// const fetchCompanyProfileData = async () => {
//     // Simulate fetching data from the server
//     const response = await fetch('http://localhost:5050/get-company-profile-data');
//     const data = await response.json();
//     return data;
//   };