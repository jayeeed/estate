/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Letter = ({

  propertyManagementCompany,
  propertyCompanyAddress,
  additionalDetails,
  appreciationDetails,
}) => {

  const appreciationQuote = (
    <>
      "Welcome to your home sweet home! We are overjoyed to have you as part of our community. Your presence adds to the vibrant spirit that makes {propertyCompanyAddress} a special place to call home."
    </>
  );

  const additionalDetailsQuote = (
    <>
      "Exciting things are happening! We're constantly working to make your living experience extraordinary. From community events to thoughtful amenities, we're here to ensure your every day is filled with comfort and happiness."
    </>
  );

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
          Dear Valued Tenats,
        </Typography>

        <Typography paragraph variant="body1">
          A warm and cheerful greeting to you! We hope this letter finds you
          well and settled into your new home at {propertyCompanyAddress}. It's
          not just a place; it's a community, and we're thrilled to have you as
          a part of it.
        </Typography>

        <Typography paragraph variant="body2">
          {additionalDetails || additionalDetailsQuote}
        </Typography>

        <Typography paragraph variant="body2">
          As your dedicated property management team, we want to ensure your
          time here is filled with joy and comfort. From beautiful surroundings
          to attentive service, we are here to make every moment special.
        </Typography>

        <Typography paragraph variant="body2">
          {appreciationDetails || appreciationQuote}
        </Typography>

        <Typography variant="subtitle1">
          Your satisfaction is our priority. If there's anything you need or if
          you have ideas to make our community even better, please don't
          hesitate to share. Together, we can make {propertyCompanyAddress} an
          even more extraordinary place to live.
        </Typography>

        <Typography variant="subtitle1">
          Thank you for choosing {propertyManagementCompany}. Here's to creating
          wonderful memories and a happy home!
        </Typography>
        <Typography variant="subtitle1">Best regards,</Typography>
        <Typography variant="subtitle1">{propertyManagementCompany}</Typography>
      </Box>

    </Box>
  );
};

export default Letter;
