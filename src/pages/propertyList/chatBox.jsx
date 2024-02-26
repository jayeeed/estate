/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button, TextField, IconButton, Paper } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import io from "socket.io-client";

const ChatBox = ({
  title,
  onClose,
  onMinimize,
  sender,
  receiver,
}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [minimized, setMinimized] = useState(false);
  const [socket, setSocket] = useState(null);
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



  const formatDate = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const messageDate = new Date(date);

    if (messageDate.toDateString() === today.toDateString()) {
      return "Today";
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return messageDate.toLocaleDateString();
    }
  };

  // Dummy messages for testing
  const dummyMessages = [
    {
      sender: "Friend",
      text: "Hello!",
      sentAt: new Date("2024-02-25T10:30:00"),
      receivedAt: new Date("2024-02-25T10:31:00"),
    },
    {
      sender: "You",
      text: "Hi there!",
      sentAt: new Date("2024-02-25T10:32:00"),
      receivedAt: new Date("2024-02-25T10:33:00"),
    },
    {
      sender: "Friend",
      text: "How are you?",
      sentAt: new Date("2024-02-25T10:34:00"),
      receivedAt: new Date("2024-02-25T10:35:00"),
    },
    {
      sender: "You",
      text: "I am doing well, thanks!",
      sentAt: new Date("2024-02-25T10:36:00"),
      receivedAt: new Date("2024-02-25T10:37:00"),
    },
  ];

  // Replace socket connection and message listener with dummy data
  useEffect(() => {
    setMessages(dummyMessages); // Set initial messages with dummy data
  }, []);

  useEffect(() => {
    const newSocket = io(`${VITE_API_BASE_URL}/notiChat`);
    setSocket(newSocket);

    newSocket.emit('subscribe', { sender, receiver });

    newSocket.on('message', (message) => {
      setMessages(prevMessages => [...prevMessages, { ...message, receivedAt: new Date() }]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [sender, receiver]);

  const handleSendMessage = () => {
    if (socket) {
      // Check if socket is not null
      const sentAt = new Date();
      socket.emit("sendMessage", {
        sender,
        receiver,
        text: newMessage,
        sentAt,
      });
      setMessages([...messages, { sender: "You", text: newMessage, sentAt }]); // Update UI optimistically
      setNewMessage("");
    } else {
      console.error("Socket is not initialized");
    }
  };

  const handleMinimize = () => {
    setMinimized(!minimized);
    onMinimize();
  };

  const handleClose = () => {
    onClose();
  };



  return (
    <Paper
      id={`chat-box`}
      style={{
        position: "fixed",
        // bottom: position.bottom,
        // right: position.right,
        bottom: 16,
        right: 16,
        zIndex: 10,
        maxWidth: 400,
        width: "100%",
        overflow: "hidden",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "space-between",
            padding: "8px",
            backgroundColor: "#075e54",
            color: "#fff",
          }}
        >
          <h3
            onClick={handleMinimize}
            style={{ cursor: "pointer", width: "75%" }}
          >
            {minimized ? (
              <>
                <ChatIcon /> {title}
              </>
            ) : (
              <>
                <ExpandMoreIcon /> {title}
              </>
            )}
          </h3>

          <IconButton
            onClick={handleClose}
            style={{ color: "inherit" }}
            onMouseDown={(e) => e.stopPropagation()} // Stop event propagation
          >
            <CloseIcon />
          </IconButton>
        </div>

        {!minimized && (
          <div style={{ padding: "16px", backgroundColor: "#f0f0f0" }}>
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  textAlign: message.sender === "You" ? "right" : "left",
                  display: "flex",
                  justifyContent:
                    message.sender === "You" ? "flex-end" : "flex-start",
                  marginBottom: "8px", // Add some space between messages
                }}
              >
                <div
                  style={{
                    backgroundColor:
                      message.sender === "You" ? "#dcf8c6" : "#fff", // Different background for sender and receiver
                    padding: "8px",
                    borderRadius: "12px", // Rounded corners
                    alignSelf: "flex-end", // Align to bottom
                  }}
                >
                  <span
                    style={{
                      color: message.sender === "You" ? "#075e54" : "#000",
                    }}
                  >
                    {message.text}
                  </span>{" "}
                  {/* Different text color */}
                </div>
              </div>
            ))}
          </div>
        )}

        {!minimized && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px",
              borderTop: "1px solid #ccc",
            }}
          >
            <TextField
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              fullWidth
              variant="outlined"
              size="small"
              style={{ marginRight: "8px" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
              startIcon={<SendIcon />}
              style={{ marginLeft: "auto" }}
            >
              Send
            </Button>
          </div>
        )}
      </div>
    </Paper>
  );
};

export default ChatBox;



  // useEffect(() => {
  //   const handleResize = () => {
  //     // Dynamically calculate position based on the number of open chat boxes
  //     const newRight =
  //       window.innerWidth -
  //       position.right -
  //       document.getElementById(`chat-box`).offsetWidth;
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [position]);