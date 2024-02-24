import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ChatBox = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const handleMessageSend = () => {
    if (messageInput.trim() !== "") {
      setMessages([...messages, { sender: "You", message: messageInput }]);
      setMessageInput("");
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "80px",
        right: "20px",
        width: "300px",
        backgroundColor: "#ffffff",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        zIndex: "9999",
      }}
    >
      <Box sx={{ padding: "10px" }}>
        <Typography variant="h6" sx={{ marginBottom: "10px" }}>
          Chat
        </Typography>
        <Box
          sx={{
            height: "200px",
            overflowY: "scroll",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          {messages.map((msg, index) => (
            <Typography key={index} variant="body1">
              <strong>{msg.sender}: </strong> {msg.message}
            </Typography>
          ))}
        </Box>
        <TextField
          variant="outlined"
          placeholder="Type your message..."
          fullWidth
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          sx={{ marginBottom: "10px" }}
        />
        <Button variant="contained" onClick={handleMessageSend}>
          Send
        </Button>
        <Button variant="text" onClick={onClose} sx={{ marginLeft: "10px" }}>
          Close
        </Button>
      </Box>
    </Box>
  );
};

export default ChatBox;






// import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import MinimizeIcon from "@mui/icons-material/Minimize";
// import RestoreIcon from "@mui/icons-material/Restore";

// const ChatBox = ({ open, onClose, responseMessage, setResponseMessage, onSend }) => {
//   const [minimized, setMinimized] = useState(false);

//   const handleSendResponse = () => {
//     onSend();
//   };

//   return (
//     <Box
//       sx={{
//         position: "fixed",
//         bottom: minimized ? 0 : 20,
//         right: 20,
//         zIndex: 9999,
//       }}
//     >
//       <Paper
//         sx={{
//           width: minimized ? 300 : 450,
//           height: minimized ? "auto" : 400,
//           padding: 2,
//           backgroundColor: "#f3f2ef",
//           position: "relative",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         {!minimized && (
//           <Box sx={{ position: "absolute", top: 0, right: 0 }}>
//             <IconButton onClick={() => setMinimized(true)}>
//               <MinimizeIcon />
//             </IconButton>
//           </Box>
//         )}
//         {minimized && (
//           <Box sx={{ position: "absolute", top: 0, right: 0 }}>
//             <IconButton onClick={() => setMinimized(false)}>
//               <RestoreIcon />
//             </IconButton>
//           </Box>
//         )}
//         {!minimized && (
//           <Box sx={{ flex: 1, overflowY: "auto", paddingBottom: 2 }}>
//             <div style={{ marginBottom: 8 }}>
//               <Typography
//                 variant="body2"
//                 sx={{ color: "#555", textAlign: "center", marginBottom: 1 }}
//               >
//                 You - {new Date().toLocaleTimeString()}
//               </Typography>
//               <Typography
//                 variant="body1"
//                 sx={{ textAlign: "center", marginBottom: 2 }}
//               >
//                 Hello! How can I help you?
//               </Typography>
//               {/* Render previous chat messages here */}
//             </div>
//           </Box>
//         )}
//         {!minimized && (
//           <>
//             <TextField
//               label="Type a message"
//               multiline
//               rows={4}
//               fullWidth
//               variant="outlined"
//               sx={{ marginTop: 2 }}
//               value={responseMessage}
//               onChange={(e) => setResponseMessage(e.target.value)}
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               sx={{ marginTop: 1 }}
//               onClick={handleSendResponse}
//             >
//               Send
//             </Button>
//           </>
//         )}
//       </Paper>
//     </Box>
//   );
// };

// export default ChatBox;

