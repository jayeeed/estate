// adminController.js
const adminLogin = (req, res) => {
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
  
  module.exports = {
    adminLogin,
  };
  