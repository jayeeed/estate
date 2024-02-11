
// adminRoutes.js
const express = require('express');
const router = express.Router();
const { adminLogin } = require('../controllers/adminControllers');
const authMiddleware = require('../middleware/auth');

// Route for admin login
router.post('/admin/login', adminLogin);

module.exports = router;
