import { useState } from "react";
import ChatBox from "./chatBox"; // Import the ChatBox component
import DashboardLayout from "../../layouts/hostDashboard";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from "@mui/material";

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

  const [chatBoxes, setChatBoxes] = useState([]);

  const handleRespond = (request) => {
    // Close existing chat boxes
    setChatBoxes([]);

    // Create a new chat box for the selected request with the calculated position
    setChatBoxes([{ title: request.name, id: request.id }]);
  };

  const handleMinimize = (chatBoxId) => {
    // Find the chat box with the specified id
    const updatedChatBoxes = chatBoxes.map((chatBox) =>
      chatBox.id === chatBoxId
        ? { ...chatBox, minimized: !chatBox.minimized }
        : chatBox
    );

    setChatBoxes(updatedChatBoxes);
  };

  const handleClose = (chatBoxId) => {
    // Filter out the chat box with the specified id
    const updatedChatBoxes = chatBoxes.filter(
      (chatBox) => chatBox.id !== chatBoxId
    );
    setChatBoxes(updatedChatBoxes);
  };

  return (
    <DashboardLayout title={"Renter Requests/Applications"}>
      <Box marginInline={8}>
        <Box marginTop={3}>
          {renterRequests.map((request, index) => (
            <div key={index}>
              <Card sx={{ marginBottom: 2, borderRadius: 6 }}>
                <CardHeader title={request.name} sx={{ paddingBottom: 1 }} />
                <CardContent sx={{ paddingInline: 4, paddingBlock: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {request.message}
                  </Typography>
                </CardContent>
                <CardActions sx={{ paddingTop: 1 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleRespond(request)}
                  >
                    Respond
                  </Button>
                </CardActions>
              </Card>
            </div>
          ))}
        </Box>
      </Box>
      <div>
        {chatBoxes.map((chatBox) => (
          <ChatBox
            key={chatBox.id}
            title={chatBox.title}
            onMinimize={() => handleMinimize(chatBox.id)}
            onClose={() => handleClose(chatBox.id)}
          />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default RenterRequestComponent;
