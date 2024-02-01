import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Letter = ({ propertyManagementCompany, propertyCompanyAddress, additionalDetails, appreciationDetails }) => {
  return (
    <Box sx={{ display: 'block' }}>
      <Box className="letter-left">
        <Typography variant="h2">{propertyManagementCompany}</Typography>
        <Typography paragraph>{propertyCompanyAddress}</Typography>
        
      </Box>

      <Box className="letter-right" sx={{ ml: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dear Tenants,
        </Typography>

        <Typography paragraph>
          I am writing to express my sincere appreciation for the outstanding service provided by {propertyManagementCompany}. As a tenant, I have experienced exceptional professionalism and dedication from your team, making my stay at {propertyCompanyAddress} truly enjoyable.
        </Typography>

        <Typography paragraph>{appreciationDetails}</Typography>

        <Typography paragraph>
          The attention to detail and prompt response to any concerns have truly set {propertyManagementCompany} apart. I feel fortunate to be a part of a community managed by such a dedicated and reliable property management company.
        </Typography>

        <Typography paragraph>{additionalDetails}</Typography>

        <Typography paragraph>
          Thank you for your continuous efforts in maintaining a high standard of service. I look forward to a continued positive relationship with {propertyManagementCompany}.
        </Typography>

        <Typography paragraph>
          Thank you for choosing our property for your stay. If there's anything you need during your time here, do not hesitate to contact us.
        </Typography>

        <Typography>Best regards,</Typography>
        <Typography>{propertyManagementCompany}</Typography>
      </Box>
    </Box>
  );
};

export default Letter;
