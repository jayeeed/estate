// ReservationRequestForm.jsx

import { useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { FormLabel } from '@mui/material';

const ReserveApply = () => {
    const [guestName, setGuestName] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [additionalDetails, setAdditionalDetails] = useState('');
    const { propertyId } = useParams();
    console.log(propertyId);

    const handleRequestSubmit = async () => {
        try {
            // Send the reservation request to the server
            const response = await axios.post('/api/reservation-requests', {
                guestName,
                checkInDate,
                checkOutDate,
                additionalDetails,
            });

            console.log('Reservation request submitted:', response.data);
            // You can redirect or show a success message here
        } catch (error) {
            console.error('Error submitting reservation request:', error);
            // Handle error, show an error message, or redirect to an error page
        }
    };

    return (
        <Card>
            <CardContent>
                <Typography variant='h3'> This property is now in on demand!!! </Typography>
                <Typography variant="h5" gutterBottom>
                    Reservation Request
                </Typography>
                <form>
                    <TextField
                        label="Guest Name"
                        fullWidth
                        margin="normal"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        required
                    />
                    <FormLabel>  Check-In Date </FormLabel>
                    <TextField
                        type="date"
                        fullWidth
                        margin="dense"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        required
                    />
                    <FormLabel>  Check-Out Date  </FormLabel>
                    <TextField

                        type="date"
                        fullWidth
                        margin="dense"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
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
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={handleRequestSubmit}
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Submit Request
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default ReserveApply;
