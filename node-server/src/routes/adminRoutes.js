/* eslint-disable no-undef */
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const express = require('express');
const router = express.Router();
const { adminLogin, estateHostSettings, uploadingTemplate, viewSetedCost} = require('../controllers/adminControllers');


// Route for admin login
router.post('/admin/login', adminLogin);
router.post('/set-cost', estateHostSettings);
router.get('/viewCost', viewSetedCost);
router.post('/admin/templateUpload',  upload.single('file'), uploadingTemplate);

module.exports = router;
