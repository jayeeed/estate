import { useState } from 'react';
import { Button, Box, Container, Typography, TextField } from '@mui/material';
// import Drawer from '@mui/material/Drawer';
// import AddCircleRounded from '@mui/icons-material/AddCircleRounded';

const SubCompany = () => {
    const [companyName, setCompanyName] = useState('');
    // const [registrationNumber, setRegistrationNumber] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [bankAccountNumber, setBankAccountNumber] = useState('');
    const [additionalDetails, setAdditionalDetails] = useState('');
    const [appreciationDetails, setAppreciationDetails] = useState('');

    const handleSubmit = async () => {
        try {
            // Your server endpoint for saving data
            const endpoint = 'http://localhost:5050/api/save-subCompnay';

            // Form data to be sent to the server
            const formData = {
                companyName,
                // registrationNumber,
                newAddress,
                bankAccountNumber,
                additionalDetails,
            };


        } catch (error) {
            console.error('Error saving data:', error);
        }
    }
    return (
        <Box sx={{ width: "20vw" }} >
            <Container maxWidth="md" >
                <Box sx={{ marginTop: 7, display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                    <Typography component="heading" variant="h2">
                        Add Sub Company
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>

                        {/* Company Details */}
                        <TextField
                            label="Company Name"
                            fullWidth
                            margin="normal"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                        />


                        {/* Bank Registration for Tokens */}
                        <TextField
                            label="Bank Account Number"
                            fullWidth
                            margin="normal"
                            value={bankAccountNumber}
                            onChange={(e) => setBankAccountNumber(e.target.value)}
                            required
                        />

                        {/* Address Change */}
                        <TextField
                            label="New Address"
                            fullWidth
                            margin="normal"
                            value={newAddress}
                            required
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



                        {/* Submit Button */}
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>

                            Register

                        </Button>
                    </Box>
                </Box>
            </Container>



        </Box>
    );
};

export default SubCompany;
