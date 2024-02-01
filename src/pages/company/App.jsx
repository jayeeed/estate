import { useState, useEffect } from 'react'
import { Container, Box, Typography, TextField, Button, Stack, Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './App.css'
import HostLetterTemplate from './letterPreview'
// import pic from "./assets/company.jpg"

export default function App() {
  // const [count, setCount] = useState(0);

  const [companyName, setCompanyName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [appreciationDetails, setAppreciationDetails] = useState('');

  const [letter, setLetter] = useState("");

  useEffect(() => {
    const formattedLetter = `
      Dear Tenats,

      I am writing to express my sincere appreciation for the outstanding service provided by ${companyName}. As a tenant, I have experienced exceptional professionalism and dedication from your team, making my stay at ${newAddress} truly enjoyable.

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
    
  }, [companyName, newAddress, appreciationDetails, additionalDetails]);


  const handleSubmit = () => {

    // Add your form submission logic here
    console.log('Form submitted:', {
      companyName,
      registrationNumber,
      newAddress,
      bankAccountNumber,
      additionalDetails,
    });
  }

  return (
    <>

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Container maxWidth="md">
            <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography component="h1" variant="h5">
                Company Registration
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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

                {/* Logo Upload */}
              <input accept="image/*" id="logo-upload" type="file" style={{ display: 'none' }} />
              <label htmlFor="logo-upload">
                <Button variant="outlined" component="span" startIcon={<CloudUploadIcon />}>
                  Upload Logo
                </Button>
              </label>


                {/* Logo Upload */}
               
                <input accept="image/*" id="logo-upload" type="file" style={{ display: 'none' }} />
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
                    />  */}
                  </Avatar>
                  <Typography variant="outlined" component="span" startIcon={<CloudUploadIcon />}>
                  Upload Logo
                </Typography> 
                </label>
        


                {/* Address Change */}
                <TextField
                  label="New Address"
                  fullWidth
                  margin="normal"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                />

                {/* Additional Details */}
                <TextField
                  label="Additional Details"
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                />

                {/* appreciationDetails Details */}
                <TextField
                  label="Appreciation Details"
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  value={appreciationDetails}
                  onChange={(e) => setAppreciationDetails(e.target.value)}
                />

                {/* Bank Registration for Tokens */}
                <TextField
                  label="Bank Account Number"
                  fullWidth
                  margin="normal"
                  value={bankAccountNumber}
                  onChange={(e) => setBankAccountNumber(e.target.value)}
                />

                {/* Submit Button */}
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Register
                </Button>
              </Box>
            </Box>
          </Container>
        </Grid>

        <Grid item xs={6}>
          <Box>
            {/* Replace placeholder values with actual data */}
            <HostLetterTemplate
              propertyManagementCompany={companyName}
              propertyCompanyAddress={newAddress}
              additionalDetails={additionalDetails}
              appreciationDetails={appreciationDetails} />
          </Box>
        </Grid>
      </Grid>



    </>
  )
}


