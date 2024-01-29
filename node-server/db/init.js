// init-script.js

// Connect to the admin database
var adminDb = db.getSiblingDB("admin");

// Create an admin user with readWrite access for any database
adminDb.createUser({
  user: "estate",
  pwd: "ipcl1994",
  roles: [
    { role: "readWriteAnyDatabase", db: "admin" },
    { role: "userAdminAnyDatabase", db: "admin" }
  ]
});

  
  // You can also create additional databases and users here if needed
  
// init.js

load("importData.js");
