require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const csp = require("helmet-csp");
const DBconnection = require("./config/DB");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/post");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const { clearScreenDown } = require("readline");

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// DB start
mongoose.set("strictQuery", false);
DBconnection();
app.listen(process.env.PORT, () => {
  console.log("Server is running @4000");
});

// middleware
app.use(cookieParser());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.REACT_APP_URL,
    credentials: true,
  })
);
app.use(
  csp({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "https://res.cloudinary.com"],
      styleSrc: ["'self'", "https://cdnjs.cloudflare.com"],
      fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],
      scriptSrc: ["'self'"],
    },
  })
);

app.get("/test", (req, res) => {
  res.status(400).send("Welcome to Backend");
});

app.get(4000, () => {
  console.log("Server is running @4000");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

//cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// app.get('/static/*', express.static('public/static'));

app.use("/static/*", (req, res) => {
  console.log(req.baseUrl);
  res.sendFile(path.join(__dirname, "public", req.baseUrl));
});

app.use("/*", (req, res) => {
  console.log(req.baseUrl);
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
