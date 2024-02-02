import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import DashboardLayout from "../../layouts/hostDashboard";

const RenterRequestComponent = () => {
  const [renterRequests, setRenterRequests] = useState([
    { id: 1, name: 'John Doe', message: 'I am interested in renting your house.' },
    { id: 2, name: 'Alice Smith', message: 'Can I get more details about the amenities?' },
    // Add more renter requests as needed
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = (request) => {
    setSelectedRequest(request);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedRequest(null);
    setResponseMessage('');
    setOpenDialog(false);
  };

  const handleSendResponse = () => {
    // Implement logic to send response to the renter
    console.log('Response Message:', responseMessage);

    // You may want to update the request status or take other actions

    // Close the dialog
    handleCloseDialog();
  };

  return (
    <DashboardLayout title={" Properties Rent Applications"}>


    <Box>
      <Typography variant="h4" gutterBottom>
        Renter Requests
      </Typography>
      {renterRequests.map((request) => (
        <Card key={request.id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">{request.name}</Typography>
            <Typography variant="body1">{request.message}</Typography>
            <Button variant="outlined" onClick={() => handleOpenDialog(request)}>
              Respond
            </Button>
          </CardContent>
        </Card>
      ))}

      {/* Dialog for responding to renter requests */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Respond to Renter Request</DialogTitle>
        <DialogContent>
          <TextField
            label="Your Response"
            multiline
            rows={4}
            fullWidth
            value={responseMessage}
            onChange={(e) => setResponseMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSendResponse}>
            Send Response
          </Button>
        </DialogActions>
      </Dialog>
    </Box>


        
    </DashboardLayout>
  );
};

export default RenterRequestComponent;
