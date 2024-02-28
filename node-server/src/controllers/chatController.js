const ChatMessage = require("../models/chatMessageModel");
const io = require("../utils/socket");

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await ChatMessage.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createMessage = async (req, res) => {
  try {
    const { sender, receiver, text, sentAt, file } = req.body;
    const newMessage = new ChatMessage({
      sender,
      receiver,
      text,
      sentAt,
      file,
    });
    await newMessage.save();

    // Emit the new message to clients using socket.io
    io.getIO().emit("newMessage", newMessage);

    res.status(201).json({ message: "Message saved successfully" });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
