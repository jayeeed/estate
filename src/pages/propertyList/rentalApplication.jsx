import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
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
      chatBox.id === chatBoxId ? { ...chatBox, minimized: !chatBox.minimized } : chatBox
    );

    setChatBoxes(updatedChatBoxes);
  };

  const handleClose = (chatBoxId) => {
    // Filter out the chat box with the specified id
    const updatedChatBoxes = chatBoxes.filter((chatBox) => chatBox.id !== chatBoxId);
    setChatBoxes(updatedChatBoxes);
  };

  return (
    <div>
      <Box>
        <Typography variant="h4" gutterBottom>
          Renter Requests
        </Typography>
        {renterRequests.map((request) => (
          <div key={request.id}>
            <Card sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h6">{request.name}</Typography>
                <Typography variant="body1">{request.message}</Typography>
                <Button
                  variant="outlined"
                  onClick={() => handleRespond(request)}
                >
                  Respond
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
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
    </div>
  );
};

export default RenterRequestComponent;
