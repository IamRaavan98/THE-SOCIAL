    require("dotenv").config();
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

    
    // middleware
    app.use(express.json())
    app.use(helmet())
    app.use(morgan("common"))


    // DB start
    mongoose.set("strictQuery", false);
    DBconnection();
    app.listen(process.env.PORT,()=>{
        console.log("Server is running @4000")
    })


    // middleware
    app.use(cookieParser());
    app.use(express.json());
    app.use(fileUpload());

    app.use(express.urlencoded({ extended: true }));
    app.use(cors({
        credentials: true,
        origin:'http://localhost:3000',
    }));


    app.get("/",(req,res)=>{
        res.status(400).send("Welcome to Backend")
    })
    app.get("/users",(req,res)=>{
        res.status(400).send("Welcome to Backend")
    })

    app.get(4000,()=>{
    console.log("Server is running @4000");
    })

    // Routes
    app.use("/api/users",userRoutes)
    app.use("/api/posts",postRoutes)