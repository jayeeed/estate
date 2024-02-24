import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import DashboardLayout from "../../layouts/hostDashboard";
import IconButton from "@mui/material/IconButton";
import MinimizeIcon from "@mui/icons-material/Minimize";
import RestoreIcon from "@mui/icons-material/Restore";
import ChatBox from "./chatBox"; // Import the ChatBox component

const RenterRequestComponent = () => {
  const [renterRequests, setRenterRequests] = useState([
    {
      id: 1,
      name: "John Doe",
      message: "I am interested in renting your house.",
    },
    {
      id: 2,
      name: "Alice Smith",
      message: "Can I get more details about the amenities?",
    },
    // Add more renter requests as needed
  ]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [chatOpen, setChatOpen] = useState(false); // State to control the chatbox

  const handleOpenChat = () => {
    setChatOpen(true);
  };

  const handleCloseChat = () => {
    setChatOpen(false);
  };

  const handleSendResponse = () => {
    console.log("Response Message:", responseMessage);
    setResponseMessage(""); // Clear the response message after sending
  };

  return (
    <DashboardLayout title={"Properties Rent Applications"}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Renter Requests
        </Typography>
        {renterRequests.map((request) => (
          <Card key={request.id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6">{request.name}</Typography>
              <Typography variant="body1">{request.message}</Typography>
              <Button
                variant="outlined"
                onClick={() => setSelectedRequest(request)}
              >
                Respond
              </Button>
            </CardContent>
          </Card>
        ))}

        {selectedRequest && (
          <Box sx={{ position: "fixed", bottom: "20px", right: "20px" }}>
            {!chatOpen ? (
              <IconButton onClick={handleOpenChat}>
                <MinimizeIcon />
              </IconButton>
            ) : (
              <>
                <ChatBox onClose={handleCloseChat} />
                <IconButton onClick={handleCloseChat}>
                  <RestoreIcon />
                </IconButton>
              </>
            )}
          </Box>
        )}

        {/* Additional content can be added here */}
      </Box>
    </DashboardLayout>
  );
};

export default RenterRequestComponent;
