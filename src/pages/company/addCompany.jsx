import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HostLetterTemplate from "./letterPreview";
import { useAuthInfo } from "../../helpers/AuthCheck";
import CustomizedSnackbars from "../../components/snackbar";

// import pic from "./assets/company.jpg"

// const PropertyList = () => {
const CreateCompanyProfile = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyRegistrationNumber, setCompanyRegistrationNumber] = useState("");
  const [companyBankAccountNumber, setCompanyBankAccountNumber] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyAdditionalDetails, setCompanyAdditionalDetails] = useState("");
  const [companyAppreciationDetails, setCompanyAppreciationDetails] = useState("");
  const [companyLogo, setCompanyLogo] = useState(null);
  const [companyBanner, setCompanyBanner] = useState(null);
  const [letter, setLetter] = useState("");
  const userInfo = useAuthInfo();
  const [validationErrors, setValidationErrors] = useState({});
  const [isSuccessSnackbarOpen, setIsSuccessSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const formattedLetter = `
      Dear Valued Tenants,

      A warm and cheerful greeting to you! We hope this letter finds you well and settled into your new home at ${companyAddress}. It's not just a place; it's a community, and we're thrilled to have you as a part of it.

      ${companyAdditionalDetails || companyAdditionalDetails == "Exciting things are happening! We're constantly working to make your living experience extraordinary. From community events to thoughtful amenities, we're here to ensure your every day is filled with comfort and happiness."}

      As your dedicated property management team, we want to ensure your time here is filled with joy and comfort. From beautiful surroundings to attentive service, we are here to make every moment special.

      ${companyAppreciationDetails || companyAppreciationDetails == `Welcome to your home sweet home! We are overjoyed to have you as part of our community. Your presence adds to the vibrant spirit that makes ${companyAddress} a special place to call home.`}

      Your satisfaction is our priority. If there's anything you need or if you have ideas to make our community even better, please don't hesitate to share. Together, we can make ${companyAddress} an even more extraordinary place to live.

      Thank you for choosing ${companyName}. Here's to creating wonderful memories and a happy home!

      Best regards,
      ${companyName}
    `;

    // Remove HTML tags using a regular expression
    const strippedLetter = formattedLetter.replace(/<\/?[^>]+(>|$)/g, "");
    setLetter(strippedLetter);
  }, [
    companyName,
    companyAddress,
    companyAdditionalDetails,
    companyAppreciationDetails,
  ]);

  const handleSuccessSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSuccessSnackbarOpen(false);
  };

  const handleSuccessSnackbarOpen = () => {
    setIsSuccessSnackbarOpen(true);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png"];
    if (file && !allowedTypes.includes(file.type)) {
      setValidationErrors(prevErrors => ({
        ...prevErrors,
        companyLogo: "Invalid file type. Please upload a JPEG or PNG image."
      }));
      return;
    }

    // Validate file size (in bytes)
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (file && file.size > maxSizeInBytes) {
      setValidationErrors(prevErrors => ({
        ...prevErrors,
        companyLogo: "File size exceeds the limit. Please upload a smaller file."
      }));
      return;
    }

    // If validation passes, clear any previous errors
    setValidationErrors(prevErrors => ({ ...prevErrors, companyLogo: "" }));

    // Set the file
    setCompanyLogo(file);
  };

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png"];
    if (file && !allowedTypes.includes(file.type)) {
      setValidationErrors(prevErrors => ({
        ...prevErrors,
        companyBanner: "Invalid file type. Please upload a JPEG or PNG image."
      }));
      return;
    }

    // Validate file size (in bytes)
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (file && file.size > maxSizeInBytes) {
      setValidationErrors(prevErrors => ({
        ...prevErrors,
        companyBanner: "File size exceeds the limit. Please upload a smaller file."
      }));
      return;
    }

    // If validation passes, clear any previous errors
    setValidationErrors(prevErrors => ({ ...prevErrors, companyBanner: "" }));

    // Set the file
    setCompanyBanner(file);
  };


  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const validateFields = () => {
    const errors = {};

    const companyNamePattern = /^[A-Za-z0-9\s]+$/;
    if (!companyNamePattern.test(companyName)) {
      errors.companyName = "Company Name should not contain special characters";
    }

    const registrationNumberPattern = /^[A-Za-z0-9]+$/;
    if (!registrationNumberPattern.test(companyRegistrationNumber)) {
      errors.companyRegistrationNumber = "Registration Number should be alphanumeric";
    }

    const bankAccountNumberPattern = /^[0-9]+$/;
    if (!bankAccountNumberPattern.test(companyBankAccountNumber)) {
      errors.companyBankAccountNumber = "Bank Account Number should be numeric";
    }

    // Add similar validations for other fields

    setValidationErrors(errors);
    setIsError(Object.keys(errors).length > 0);

    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  // Function to clear form fields
  const clearFormFields = () => {
    setCompanyName("");
    setCompanyRegistrationNumber("");
    setCompanyBankAccountNumber("");
    setCompanyAddress("");
    setCompanyAdditionalDetails("");
    setCompanyAppreciationDetails("");
    setLetter(""); // Assuming letter is a state variable
    setCompanyLogo(null); // Assuming companyLogo is a state variable
    setCompanyBanner(null); // Assuming companyBanner is a state variable
  };
  const navigateToCompanyViewPage = () => {
    window.location.href = '/company'; // Replace '/companyView' with the URL you want to navigate to
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields before submitting
    const isValid = validateFields();

    if (!isValid) {
      console.error("Validation errors:", validationErrors);
      return;
    }

    try {
      const endpoint = `${VITE_API_BASE_URL}/add-company`;
      const userId = userInfo._id;

      const formData = {
        userId,
        companyName,
        companyRegistrationNumber,
        companyBankAccountNumber,
        companyAddress,
        companyAdditionalDetails,
        companyAppreciationDetails,
        letter,
        companyLogo: await convertToBase64(companyLogo),
        companyBanner: await convertToBase64(companyBanner),
      };

      console.log("Form Data:", formData);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Data saved successfully:", result);
        setIsSuccessSnackbarOpen(true);
        setMessage("You successfully created a company");
        setType("success");
        clearFormFields();
        handleSuccessSnackbarOpen();
        navigateToCompanyViewPage();


      } else {
        console.error("Error saving data:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };


  return (
    <>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        style={{ marginTop: "30px" }}
      >
        <Grid container spacing={0} >

          <Grid item xs={12} md={6} >
            {/* <Container maxWidth="md"> */}

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

              <Grid container spacing={2}>
                <Grid item xs={8}>
                  {/* Company Details */}
                  <TextField
                    label="Company Name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    error={isError}
                    helperText={isError ? validationErrors.companyName : ""}
                    sx={{ borderRadius: 8 }}
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
                    error={!!validationErrors.companyRegistrationNumber}
                    helperText={
                      validationErrors.companyRegistrationNumber || ""
                    }
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
                      style={{
                        backgroundColor: companyLogo ? "green" : "inherit",
                      }}
                    >
                      {companyLogo ? "Logo Uploaded" : "Upload Logo"}
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
                      style={{
                        backgroundColor: companyBanner ? "green" : "inherit",
                      }}
                    >
                      {companyBanner ? "Banner Uploaded" : "Upload Banner"}
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
                error={!!validationErrors.companyBankAccountNumber}
                helperText={validationErrors.companyBankAccountNumber || ""}
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
                required
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
                } required
              />



            </Box>
            {/* </Container> */}
          </Grid>

          <Grid item xs={12} md={6}>
            {/* Replace placeholder values with actual data */}
            <HostLetterTemplate

              propertyManagementCompany={companyName}
              propertyCompanycompanyAddress={companyAddress}
              additionalDetails={companyAdditionalDetails}
              appreciationDetails={companyAppreciationDetails}
            />
          </Grid>


        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"

          sx={{ mt: 3, mb: 10 }}
        >
          Register
        </Button>
      </form>

      {/* Snackbar for Success */}
      <CustomizedSnackbars
        open={isSuccessSnackbarOpen}
        message={message}
        type={type}
        onClose={handleSuccessSnackbarClose}
      />
    </>
  );
};

export default CreateCompanyProfile;
