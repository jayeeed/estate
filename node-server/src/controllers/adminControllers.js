/* eslint-disable no-undef */
// adminController.js
// Import necessary modules
const EstateHostModel = require('../models/setCostModel');
const FileUpload = require('../models/templateModel');


exports.adminLogin = (req, res) => {
    const { email, password } = req.body;
  
    // Check if the username and password match the default admin credentials
    if (email === 'admin@example.com' && password === 'airbnb123') {
      // Generate a JWT token or set a session for admin authentication
      // Here, for simplicity, just send a success message
      res.status(200).json({ message: 'Admin login successful' });
    } else {
      // If credentials don't match, send an error response
      res.status(401).json({ message: 'Invalid credentials' });
    }
  };
  

  exports.uploadingTemplate = async (req, res) => {
    try {
      // Get the file data from the request
      const {file} = req;
      console.log(file);

      const { originalname, buffer,encoding, mimetype } = file;
      const newImage = new FileUpload({
        filename: originalname,
        data: buffer,
        encoding :encoding,
        contentType: mimetype,
      });
  
      await newImage.save();
  
      res.status(201).json({ message: 'File uploaded successfully' });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };



  exports.viewSetedCost = async (req, res) => {
    try {
      // Fetch the set host costs from the database
      const costs = await EstateHostModel.find();
      
  
      // If there are set host costs, send them as a response
      if (costs) {
        return res.status(200).json(costs);
      } else {
        // If there are no set host costs, send a 404 status with an error message
        return res.status(404).json({ message: 'No set host costs found.' });
      }
    } catch (error) {
      // If any error occurs during the operation, send a 500 status with an error message
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  




// Controller function to handle the POST request
 exports.estateHostSettings = async (req, res) => {
  try {
    // Extract the form data from the request body
    const {
      hostCost,
      subscriptionActive,
       Region,
       Country,
       Category,
       Currency,
       TimeZone
    } = req.body;

    // Create a new instance of EstateHostSettings with the form data
    const formData = new EstateHostModel({
      hostCost,
      subscriptionActive,
       Region,
       Country,
       Category,
       Currency,
       TimeZone
    });
    console.log(formData);

    // Save the form data to the database
    await formData.save();

    // Send a success response
    res.status(200).json({ message: 'Form data submitted successfully' });
  } catch (error) {
    // Handle any errors that occur during the submission process
    console.error('Error submitting form data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};





  
    // exports.uploadingTemplate = async (req, res) => {
  //   try {
  //     // Get the file data from the request
  //     const { file } = req;
  //     console.log(file);
  
  //     // Create a new document in the FileUpload collection
  //     const newFileUpload = new FileUpload({
  //       filename: file.originalname,
  //       // Add more fields as needed to store additional information about the file
  //     });
  
  //     // Save the document to the database
  //     await newFileUpload.save();
  
  //     res.status(201).json({ message: 'File uploaded successfully' });
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // };