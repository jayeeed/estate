// ChatBox.js
import { useEffect, useState } from 'react';
import { Button, TextField, IconButton, Paper } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import io from 'socket.io-client';

const ChatBox = ({ title, onClose, onMinimize, position, sender, receiver }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [minimized, setMinimized] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to the WebSocket server
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    // Subscribe to the chat room
    newSocket.emit('subscribe', { sender, receiver });

    // Listen for incoming messages
    newSocket.on('message', (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      // Disconnect the socket when the component unmounts
      newSocket.disconnect();
    };
  }, [sender, receiver, messages]);

  const handleSendMessage = () => {
    // Send the message to the server
    socket.emit('sendMessage', { sender, receiver, text: newMessage });
    setNewMessage('');
  };

  const handleMinimize = () => {
    setMinimized(!minimized);
    onMinimize(); // Notify the parent component about minimizing
  };

  const handleClose = () => {
    onClose(); // Notify the parent component about closing
  };

  useEffect(() => {
    // Dynamically calculate position based on the number of open chat boxes
    const handleResize = () => {
      const newRight = window.innerWidth - position.right - document.getElementById(`chat-box`).offsetWidth;
      // No need to use setPosition here, as position is received as a prop
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [position]);

  return (
    <Paper
      id={`chat-box`}
      style={{
        position: 'fixed',
        bottom: position.bottom,
        right: position.right,
        zIndex: 10,
        maxWidth: 400,
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', padding: '8px', backgroundColor: '#3f51b5', color: '#fff' }}>
          <h2>{title}</h2>
          <IconButton onClick={handleMinimize} style={{ marginLeft: 'auto', color: 'inherit' }}>
            {minimized ? <ChatIcon /> : <ExpandMoreIcon />}
          </IconButton>
          <IconButton onClick={handleClose} style={{ color: 'inherit' }}>
            <CloseIcon />
          </IconButton>
        </div>

        {!minimized && (
          <div style={{ padding: '16px', backgroundColor: '#f0f0f0' }}>
            {messages.map((message, index) => (
              <div key={index} style={{ marginBottom: '8px', color: message.sender === 'You' ? '#4CAF50' : '#333' }}>
                <strong>{message.sender}:</strong> {message.text}
              </div>
            ))}
          </div>
        )}

        {!minimized && (
          <div style={{ display: 'flex', alignItems: 'center', padding: '8px', borderTop: '1px solid #ccc' }}>
            <TextField
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} // Trigger sendMessage on Enter key
              fullWidth
              variant="outlined"
              size="small"
              style={{ marginRight: '8px' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
              startIcon={<SendIcon />}
              style={{ marginLeft: 'auto' }}
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


// // You will need to install socket.io-client and axios using npm or yarn
// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import axios from 'axios';

// const ChatComponent = ({ sender, receiver }) => {
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState('');
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     // Connect to the WebSocket server
//     const newSocket = io('http://localhost:5000');
//     setSocket(newSocket);

//     // Fetch existing messages from the server
//     axios.get(`http://localhost:5000/messages/${sender}/${receiver}`)
//       .then((response) => setMessages(response.data))
//       .catch((error) => console.error('Error fetching messages:', error));

//     return () => {
//       newSocket.disconnect(); // Disconnect the socket when the component unmounts
//     };
//   }, [sender, receiver]);

//   const sendMessage = () => {
//     // Send the message to the server
//     socket.emit('sendMessage', { sender, receiver, text });
//     setText('');
//   };

//   useEffect(() => {
//     // Listen for new messages from the server
//     if (socket) {
//       socket.on('newMessage', (message) => {
//         setMessages([...messages, message]);
//       });
//     }
//   }, [socket, messages]);

//   return (
//     <div>
//       <div>
//         {messages.map((message, index) => (
//           <div key={index}>
//             <strong>{message.sender}:</strong> {message.text}
//           </div>
//         ))}
//       </div>
//       <div>
//         <input
//           type="text"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatComponent;
