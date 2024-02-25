// Import required packages
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors"); // Import the CORS package
const { ErrorHandler, handleErrors } = require("./src/utils/errorHandler");
const pdf = require("html-pdf");
require("dotenv").config();

// Create the Express app
const app = express();

// Set up port for the server
const port = process.env.PORT || 5000;

// Set up database connection URL
const dbURL =
  process.env.MONGODB_URL ||
  "mongodb+srv://ipsita:Ipsita%402023@uk-bd0.u3pngqk.mongodb.net/airbnb";
// "mongodb+srv://ukbd:MNjqO714lSWx6le5@uk-bd-00.kt2fhlb.mongodb.net/uk-bd";

// Use CORS middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true, // Allow cookies to be sent along with requests
  })
);

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("combined"));

// Import and use userRoute
const userRoute = require("./src/routes/userRoute");
const frontendRoute = require("./src/routes/frontendRoute");
const propertyRoute = require("./src/routes/propertyRoute");
const stripePaymentRoute = require("./src/routes/stripePaymentRoute");
const pdfTemplate = require("./src/documents/pdfTemplate");
const bookingRoute = require("./src/routes/bookingRoute");
const reviewRoute = require("./src/routes/reviewRoute");
const profileRoute = require("./src/routes/profileRoute");
const adminRoutes = require("./src/routes/adminRoutes");
const companyRoute = require("./src/routes/companyRoutes");
const subCompanyRoute = require("./src/routes/subCompanyRoutes");
const postJobRoute = require("./src/routes/postJobRoutes");
const chatRoute = require("./src/routes/chatRoute")

app.use("/api", userRoute);
app.use("/api", adminRoutes);
app.use("/api", frontendRoute);
app.use("/api", propertyRoute);
app.use("/api", stripePaymentRoute);
app.use("/api", bookingRoute);
app.use("/api", reviewRoute);
app.use("/api", profileRoute);
app.use("/api", companyRoute);
app.use("/api", subCompanyRoute);
app.use("/api", postJobRoute);
app.use("/api", chatRoute);

// pdf generate and fetch from client
app.post("/api/create-pdf", (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile("invoice.pdf", (err) => {
    if (err) {
      res.status(500).send("Something went wrong while generating the PDF");
    } else {
      res.status(200).send("PDF successfully created");
    }
  });
});

app.get("/api/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/invoice.pdf`, (err) => {
    if (err) {
      res.status(404).send("PDF not found");
    }
  });
});

//Error handling middleware
app.use(handleErrors);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// console.log(dbURL);
// Connect to MongoDB
mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Set up connection events
const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Connected to MongoDB");

  // Start the server only after the database connection is established
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});

connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});

connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

app.get("/", (req, res, next) => {
  res.status(200).send("Server is working...");
});
