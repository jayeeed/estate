import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@emotion/react";

const Letter = ({
  propertyManagementCompany,
  propertyCompanyAddress,
  additionalDetails,
  appreciationDetails,
}) => {
  return (
    <Box
      sx={{
        display: "block",
        background: "White",
        borderRadius: 4,
        marginBlock: 3,
        padding: 4,
      }}
    >
      <Box className="letter-left">
        <Typography variant="h2">{propertyManagementCompany}</Typography>
        <Typography paragraph>{propertyCompanyAddress}</Typography>
      </Box>

      <Box className="letter-right">
        <Typography variant="h4" gutterBottom>
          Dear Tenants,
        </Typography>

        <Typography paragraph variant="body1">
          I am writing to express my sincere appreciation for the outstanding
          service provided by {propertyManagementCompany}. As a tenant, I have
          experienced exceptional professionalism and dedication from your team,
          making my stay at {propertyCompanyAddress} truly enjoyable.
        </Typography>

        <Typography paragraph variant="body2">{appreciationDetails}</Typography>

        <Typography paragraph variant="body2">
          The attention to detail and prompt response to any concerns have truly
          set {propertyManagementCompany} apart. I feel fortunate to be a part
          of a community managed by such a dedicated and reliable property
          management company.
        </Typography>

        <Typography paragraph variant="body2">{additionalDetails}</Typography>

        <Typography variant="subtitle1">
          Thank you for choosing our property for your stay. If there's anything
          you need during your time here, do not hesitate to contact us.
        </Typography>

        <Typography variant="subtitle1">Best regards,</Typography>
        <Typography>{propertyManagementCompany}</Typography>
      </Box>
    </Box>
  );
};

export default Letter;
