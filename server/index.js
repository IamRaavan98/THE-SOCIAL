require("dotenv").config();
const path = require('path');
const express = require("express")
const app = express();
const mongoose = require("mongoose")
const morgan = require("morgan")
const helmet =  require("helmet")
const DBconnection = require("./config/DB");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/post");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cloudinary = require('cloudinary').v2


// middleware
app.use(express.json())

// this is used beacuse clodinaru when images are coming its givng csp error i.e content security policy means cannot have content from  unsrtusted soruce i.e why we are using it
app.use(helmet.contentSecurityPolicy({
  directives: {
      "default-src":[ "'self'" ],
      "base-uri":[ "'self'" ],
      "font-src":[ "'self'", "https:", "data:" ],
      "frame-ancestors":[ "'self'" ],
      "img-src":[ "'self'", "data:", "http://res.cloudinary.com"],
      "script-src":[ "'self'" ],
      "script-src-attr":[ "'none'" ],
      "style-src":[ "'self'", "https:", "'unsafe-inline'" ],
  }
}))
app.use(morgan("common"))


// DB start
mongoose.set("strictQuery", false);
DBconnection();


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
// app.use(cors({
//     origin:process.env.REACT_APP_FRONTEND_URL,
//     credentials: true,
// }));

//this is giving error after build as localhost:4000/ is should be login accroding to frontened but it stucking here
// app.get("/",(req,res)=>{
//     res.status(400).send("Welcome to Backend")
// })
// app.get("/users",(req,res)=>{
//     res.status(400).send("Welcome to Backend")
// })





// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)

//cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });



  // Serve the React app for all other requests
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});




app.listen(process.env.PORT,()=>{
  console.log("Server is running",process.env.PORT)
})

