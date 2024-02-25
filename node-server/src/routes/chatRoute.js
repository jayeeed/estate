const express = require("express");
const {getAllMessages, createMessage} = require("../controllers/chatController");

const router = express.Router();

router.get("/notiChat", getAllMessages);
router.post("/notiChat", createMessage);


module.exports = router;
