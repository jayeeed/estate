/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button, TextField, IconButton, Paper } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import io from "socket.io-client";
import socketIOClient from "socket.io-client";
import { AttachFile } from "@mui/icons-material";

const ChatBox = ({ title, onClose, onMinimize, sender, receiver }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(null); // State to hold the selected file
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


  useEffect(() => {
    console.log(VITE_API_BASE_URL);
    const newSocket = io("http://localhost:5050/api/notiChat");
    console.log(newSocket)
    setSocket(newSocket);

    newSocket.emit("subscribe", { sender, receiver });

    newSocket.on("message", (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...message, receivedAt: new Date() },
      ]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [sender, receiver]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  // Replace socket connection and message listener with dummy data
  useEffect(() => {
    setMessages(dummyMessages); // Set initial messages with dummy data
  }, []);

  const handleSendMessage = () => {
    if (socket) {
      const sentAt = new Date();
      const messageData = {
        sender,
        receiver,
        text: newMessage,
        sentAt,
        file: file
          ? {
              name: file.name,
              size: file.size,
              type: file.type,
              content: null, // Initialize content
            }
          : null,
      };

      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          messageData.file.content = event.target.result; // Set content to base64 data URI
          socket.emit("sendMessage", messageData);
          setMessages([...messages, { sender: "You", ...messageData }]); // Update UI optimistically
          setNewMessage("");
          setFile(null); // Clear selected file after sending
        };
        reader.readAsDataURL(file); // Read file as data URL
      } else {
        socket.emit("sendMessage", messageData);
        setMessages([...messages, { sender: "You", ...messageData }]); // Update UI optimistically
        setNewMessage("");
        setFile(null); // Clear selected file after sending
      }
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
        bottom: minimized ? 16 : 0, // Adjusted bottom position when minimized
        right: 16,
        zIndex: 10,
        width: 400, // Fixed width
        height: minimized ? "auto" : 600, // Adjusted height when minimized
        overflow: "hidden", // Hide overflow when minimized
        transition: "bottom 0.3s ease", // Smooth transition animation
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px",
          backgroundColor: "#075e54",
          color: "#fff",
          flexShrink: 0, // Don't allow header to be scrolled
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
      {/* Message Container */}
      {!minimized && (
        <div
          style={{
            overflowY: "auto", // Enable vertical scrolling if content exceeds height
            flexGrow: 1, // Allow message container to grow and occupy remaining space
          }}
        >
          {/* Messages */}
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                textAlign: message.sender === sender ? "right" : "left",
                display: "flex",
                justifyContent:
                  message.sender === sender ? "flex-end" : "flex-start",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  backgroundColor:
                    message.sender === sender ? "#dcf8c6" : "#fff",
                  padding: "8px",
                  borderRadius: "12px",
                  alignSelf: "flex-end",
                }}
              >
                <span
                  style={{
                    color: message.sender === sender ? "#075e54" : "#000",
                  }}
                >
                  {message.text}
                </span>{" "}
                {message.file && (
                  <div>
                    <span style={{ fontSize: "0.8rem" }}>
                      {message.file.name} (
                      {(message.file.size / 1024).toFixed(2)} KB)
                    </span>
                    <br />
                    {message.file.type.startsWith("image/") ? (
                      <img
                        src={message.file.content} // Use the content directly as the src
                        alt={message.file.name}
                        style={{ maxWidth: "200px", maxHeight: "200px" }}
                      />
                    ) : (
                      <a href={message.file.content} download>
                        Download {message.file.name}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Input and Send Button */}
      {!minimized && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px",
            borderTop: "1px solid #ccc",
            flexShrink: 0, // Don't allow input container to be scrolled
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
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="file-input"
          />
          <label htmlFor="file-input">
            <IconButton component="span">
              <AttachFile />
            </IconButton>
          </label>
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
    </Paper>
  );
};

export default ChatBox;


