import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HostLetterTemplate from "./letterPreview";
import DashboardLayout from "../../layouts/hostDashboard";
import { AddCircleRounded } from "@mui/icons-material";

// import pic from "./assets/company.jpg"

// const PropertyList = () => {
const CreateCompanyProfile = () => {
  const [companyName, setCompanyName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [address, setAddress] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [appreciationDetails, setAppreciationDetails] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    setLogoFile(file);
  };

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    setBannerFile(file);
  };


  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [letter, setLetter] = useState("");

  useEffect(() => {
    const formattedLetter = `
      Dear Tenats,

      I am writing to express my sincere appreciation for the outstanding service provided by ${companyName}. As a tenant, I have experienced exceptional professionalism and dedication from your team, making my stay at ${address} truly enjoyable.

      ${appreciationDetails}

      The attention to detail and prompt response to any concerns have truly set ${companyName} apart. I feel fortunate to be a part of a community managed by such a dedicated and reliable property management company.

      Thank you for your continuous efforts in maintaining a high standard of service. I look forward to a continued positive relationship with ${companyName}.

      Thank you for choosing our property for your stay. If there's anything you need during your time here, do not hesitate to contact us.

      Best regards,
      ${companyName}
    `;

    // Remove HTML tags using a regular expression
    const strippedLetter = formattedLetter.replace(/<\/?[^>]+(>|$)/g, "");
    setLetter(strippedLetter);
  }, [companyName, address, appreciationDetails, additionalDetails]);



  // const handleSubmit = (e) => {
  //   e.preventDefault();


  // Here you can send the formData to your backend for further processing
  // For example, using fetch or axios to send a POST request to your API endpoint
  // fetch('your-api-endpoint', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(formData),
  // })
  //   .then(response => response.json())
  //   .then(data => console.log('Response from server:', data))
  //   .catch(error => console.error('Error:', error));
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Your server endpoint for saving data
      const endpoint = `${VITE_API_BASE_URL}/add-company`;


      // Form data
      const formData = {
        companyName,
        registrationNumber,
        bankAccountNumber,
        address,
        additionalDetails,
        appreciationDetails,
        logoFile,
        bannerFile,
      };

      // Log the form data for demonstration purposes
      console.log('Form Data:', formData);

      // Make a POST request to the server
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });


      // Check if the request was successful (status code 200-299)
      if (response.ok) {
        const result = await response.json();
        console.log("Data saved successfully:", result);
      } else {
        console.error("Error saving data:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <>
      {/* <DashboardLayout title={"Company info"}> */}
      <Grid container spacing={0} height={"100vh"}>
        <Grid item xs={6}>
          <Container maxWidth="md">
            <Box
              sx={{
                marginTop: 1,
                paddingInline: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
              }}
            >
              <Typography component="heading" variant="h2">
                Company Registration
              </Typography>
              <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ marginTop: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    {/* Company Details */}
                    <TextField
                      label="Company Name"
                      fullWidth
                      margin="normal"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                    />
                    <TextField
                      label="Registration Number"
                      fullWidth
                      margin="normal"
                      value={registrationNumber}
                      onChange={(e) => setRegistrationNumber(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <input
                      accept="image/*"
                      id="logo-upload"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleLogoUpload}
                    />
                    <label htmlFor="logo-upload">
                      <Button
                        variant="outlined"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload Logo
                      </Button>
                    </label>
                    <br />
                    <input
                      accept="image/*"
                      id="logo-upload"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleBannerUpload}
                    />
                    <label htmlFor="logo-upload">
                      <Button
                        variant="outlined"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload Banner
                      </Button>
                    </label>
                  </Grid>
                </Grid>






                <TextField
                  label="Bank Account Number"
                  fullWidth
                  margin="normal"
                  value={bankAccountNumber}
                  onChange={(e) => setBankAccountNumber(e.target.value)}
                  required
                />
                <TextField
                  label="Address"
                  fullWidth
                  margin="normal"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <TextField
                  label="Additional Details"
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                />
                <TextField
                  label="Appreciation Details"
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  value={appreciationDetails}
                  onChange={(e) => setAppreciationDetails(e.target.value)}
                />


                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Register
                </Button>
              </form>
            </Box>
          </Container>
        </Grid>

        <Grid item xs={6}>
          {/* Replace placeholder values with actual data */}
          <HostLetterTemplate
            propertyManagementCompany={companyName}
            propertyCompanyAddress={address}
            additionalDetails={additionalDetails}
            appreciationDetails={appreciationDetails}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CreateCompanyProfile;

{
  /* Logo Upload */
}
{
  /* <input accept="image/*" id="logo-upload" type="file" style={{ display: 'none' }} />
                <label htmlFor="logo-upload" text-align ="center" >
                  <Avatar
                    // src={pic}
                    variant="rounded"
                    sx={{
                      width: 120,
                      height: 120,
                      backgroundColor: '#f0f0f0',
                      cursor: 'pointer',
                    }}
                  >
                  {/* <img
                      src={pic}
                      alt="Upload Logo"
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />  */
}
{
  /* </Avatar>
                  <Typography variant="outlined" component="span" startIcon={<CloudUploadIcon />}>
                  Upload Logo
                </Typography> 
                </label> */
}
