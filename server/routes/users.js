const express = require("express");
const { checkLoginOrNot } = require("../middleware/auth");
const userRoutes = express.Router();
const { register, 
        login, 
        updatePassword,
        deleteUser,
        getUser,
        follow,
        unfollow,
        logout} = require("../controllers/user");

userRoutes.get("/",(req,res)=>{
    res.status(400).send("welcome to the user routes")
})

userRoutes.post("/register",register)
userRoutes.post("/login",login)
userRoutes.get("/logout",logout)
userRoutes.put("/updatePassword/:id",checkLoginOrNot,updatePassword);
userRoutes.delete("/deleteUser/:id",checkLoginOrNot,deleteUser);
userRoutes.get("/getUser/:id",checkLoginOrNot,getUser);
userRoutes.put("/:id/follow",checkLoginOrNot,follow);
userRoutes.put("/:id/unfollow",checkLoginOrNot,unfollow);


module.exports = userRoutes

