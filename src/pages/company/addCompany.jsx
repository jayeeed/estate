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
import { Buffer } from "buffer";

// import pic from "./assets/company.jpg"

// const PropertyList = () => {
const CreateCompanyProfile = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyRegistrationNumber, setCompanyRegistrationNumber] =
    useState("");
  const [companyBankAccountNumber, setCompanyBankAccountNumber] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyAdditionalDetails, setCompanyAdditionalDetails] = useState("");
  const [companyAppreciationDetails, setCompanyAppreciationDetails] =
    useState("");
  const [companyLogo, setCompanyLogo] = useState(null);
  const [companyBanner, setCompanyBanner] = useState(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    setCompanyLogo(file);
  };

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    setCompanyBanner(file);
  };

  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [letter, setLetter] = useState("");

  useEffect(() => {
    const formattedLetter = `
      Dear Tenats,

      I am writing to express my sincere appreciation for the outstanding service provided by ${companyName}. As a tenant, I have experienced exceptional professionalism and dedication from your team, making my stay at ${companyAddress} truly enjoyable.

      ${companyAppreciationDetails}

      The attention to detail and prompt response to any concerns have truly set ${companyName} apart. I feel fortunate to be a part of a community managed by such a dedicated and reliable property management company.

      Thank you for your continuous efforts in maintaining a high standard of service. I look forward to a continued positive relationship with ${companyName}.

      Thank you for choosing our property for your stay. If there's anything you need during your time here, do not hesitate to contact us.

      Best regards,
      ${companyName}
    `;

    // Remove HTML tags using a regular expression
    const strippedLetter = formattedLetter.replace(/<\/?[^>]+(>|$)/g, "");
    setLetter(strippedLetter);
  }, [
    companyName,
    companyAddress,
    companyAppreciationDetails,
    companyAdditionalDetails,
  ]);

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Your server endpoint for saving data
      const endpoint = `${VITE_API_BASE_URL}/add-company`;

      // Form data
      const formData = {
        companyName,
        companyRegistrationNumber,
        companyBankAccountNumber,
        companyAddress,
        companyAdditionalDetails,
        companyAppreciationDetails,
        // Store the logo and banner as base64 strings
        companyLogo: await convertToBase64(companyLogo),
        companyBanner: await convertToBase64(companyBanner),
      };

      // Log the form data for demonstration purposes
      console.log("Form Data:", formData);

      // Make a POST request to the server
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Typography component="heading" variant="h2">
                Company Registration
              </Typography>
              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                style={{ marginTop: 1 }}
              >
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
                      value={companyRegistrationNumber}
                      onChange={(e) =>
                        setCompanyRegistrationNumber(e.target.value)
                      }
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
                      id="banner-upload"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleBannerUpload}
                    />
                    <label htmlFor="banner-upload">
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
                  value={companyBankAccountNumber}
                  onChange={(e) => setCompanyBankAccountNumber(e.target.value)}
                  required
                />
                <TextField
                  label="companyAddress"
                  fullWidth
                  margin="normal"
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                  required
                />
                <TextField
                  label="Additional Details"
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  value={companyAdditionalDetails}
                  onChange={(e) => setCompanyAdditionalDetails(e.target.value)}
                />
                <TextField
                  label="Appreciation Details"
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  value={companyAppreciationDetails}
                  onChange={(e) =>
                    setCompanyAppreciationDetails(e.target.value)
                  }
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
            propertyCompanycompanyAddress={companyAddress}
            companyAdditionalDetails={companyAdditionalDetails}
            companyAppreciationDetails={companyAppreciationDetails}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CreateCompanyProfile;
