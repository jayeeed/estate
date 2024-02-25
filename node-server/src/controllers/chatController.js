const ChatMessage = require('../models/chatMessageModel');

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await ChatMessage.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createMessage = async (req, res) => {
  const { sender, receiver, text } = req.body;
  const message = new ChatMessage({ sender, receiver, text });

  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
