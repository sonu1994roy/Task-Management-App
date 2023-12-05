
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const errorMiddleware = require("./middleware/error");
const fileUpload = require("express-fileupload");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
  console.log('production');
}else{
  console.log('unproduction');
  require("dotenv").config()
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports

const user = require("./routes/route");   



// Handle preflight (OPTIONS) requests

app.use("/api/v1", user);


app.use(express.static(path.join(__dirname, "../frontend/dist")));
// Home page  for noraml acsess user end
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});

// admin panle  for admin acsess 



// Middleware for Errors
app.use(errorMiddleware);

// for 404 routes  Errors  and retrun normal pages for show 404 page
app.use(function (req, res) {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;
