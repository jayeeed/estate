/* eslint-disable no-undef */

// adminRoutes.js
const express = require('express');
const router = express.Router();
const { adminLogin, estateHostSettings } = require('../controllers/adminControllers');


// Route for admin login
router.post('/admin/login', adminLogin);
router.post('/set-cost',estateHostSettings);

module.exports = router;
