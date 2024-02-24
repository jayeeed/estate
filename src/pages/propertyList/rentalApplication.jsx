import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import DashboardLayout from "../../layouts/hostDashboard";

const RenterRequestComponent = () => {
  const [renterRequests, setRenterRequests] = useState([
    { id: 1, name: 'John Doe', message: 'I am interested in renting your house.' },
    { id: 2, name: 'Alice Smith', message: 'Can I get more details about the amenities?' },
    // Add more renter requests as needed
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = (request) => {
    setSelectedRequest(request);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setSelectedRequest(null);
    setResponseMessage('');
    setDrawerOpen(false);
  };

  const handleSendResponse = () => {
    // Implement logic to send response to the renter
    console.log('Response Message:', responseMessage);

    // You may want to update the request status or take other actions

    // Close the drawer
    handleCloseDrawer();
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
              <Button variant="outlined" onClick={() => handleOpenDrawer(request)}>
                Respond
              </Button>
            </CardContent>
          </Card>
        ))}

        {/* Drawer for responding to renter requests */}
    {/* Drawer for responding to renter requests */}
{/* Drawer for responding to renter requests */}
<Drawer
  anchor="bottom"
  open={drawerOpen}
  onClose={handleCloseDrawer}
  sx={{
    "& .MuiDrawer-paper": { width: "320px" },
    "& .MuiBackdrop-root": { backdropFilter: 'none' },
 backdropFilter: drawerOpen ? 'none' : 'blur(8px)', pointerEvents: drawerOpen ? 'auto' : 'none' }}
  ModalProps={{ disableBackdropClick: true }}
>
  <Paper
    sx={{
      width: "20rem",
      height: '100%',
      padding: 2,
      backgroundColor: '#f4f6f8', // Light gray background
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Box sx={{ flex: 1, overflowY: 'auto', paddingBottom: 2 }}>
      {/* Chat messages go here */}
      <div>
        <div style={{ marginBottom: 8, textAlign: 'right' }}>
          <Typography variant="body2" sx={{ color: '#777' }}>You - {new Date().toLocaleTimeString()}</Typography>
          <Typography variant="body1">Hello! How can I help you?</Typography>
        </div>
        {/* Render previous chat messages here */}
      </div>
    </Box>
    <TextField
      label="Your Response"
      multiline
      rows={4}
      fullWidth
      variant="outlined"
      sx={{ marginTop: 2 }}
      value={responseMessage}
      onChange={(e) => setResponseMessage(e.target.value)}
    />
    <Button variant="contained" color="primary" sx={{ marginTop: 1 }} onClick={handleSendResponse}>
      Send
    </Button>
  </Paper>
</Drawer>


      </Box>
    </DashboardLayout>
  );
};

export default RenterRequestComponent;




// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import TextField from '@mui/material/TextField';
// import DashboardLayout from "../../layouts/hostDashboard";

// const RenterRequestComponent = () => {
//   const [renterRequests, setRenterRequests] = useState([
//     { id: 1, name: 'John Doe', message: 'I am interested in renting your house.' },
//     { id: 2, name: 'Alice Smith', message: 'Can I get more details about the amenities?' },
//     // Add more renter requests as needed
//   ]);

//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [responseMessage, setResponseMessage] = useState('');
//   const [openDialog, setOpenDialog] = useState(false);

//   const handleOpenDialog = (request) => {
//     setSelectedRequest(request);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setSelectedRequest(null);
//     setResponseMessage('');
//     setOpenDialog(false);
//   };

//   const handleSendResponse = () => {
//     // Implement logic to send response to the renter
//     console.log('Response Message:', responseMessage);

//     // You may want to update the request status or take other actions

//     // Close the dialog
//     handleCloseDialog();
//   };

//   return (
//     <DashboardLayout title={" Properties Rent Applications"}>


//     <Box>
//       <Typography variant="h4" gutterBottom>
//         Renter Requests
//       </Typography>
//       {renterRequests.map((request) => (
//         <Card key={request.id} sx={{ marginBottom: 2 }}>
//           <CardContent>
//             <Typography variant="h6">{request.name}</Typography>
//             <Typography variant="body1">{request.message}</Typography>
//             <Button variant="outlined" onClick={() => handleOpenDialog(request)}>
//               Respond
//             </Button>
//           </CardContent>
//         </Card>
//       ))}

//       {/* Dialog for responding to renter requests */}
//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogTitle>Respond to Renter Request</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Your Response"
//             multiline
//             rows={4}
//             fullWidth
//             value={responseMessage}
//             onChange={(e) => setResponseMessage(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Cancel</Button>
//           <Button variant="contained" color="primary" onClick={handleSendResponse}>
//             Send Response
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>


        
//     </DashboardLayout>
//   );
// };

// export default RenterRequestComponent;
