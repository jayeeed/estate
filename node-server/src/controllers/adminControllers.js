/* eslint-disable no-undef */
// adminController.js
// Import necessary modules
const EstateHostModel = require('../models/setCostModel');




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





  
  