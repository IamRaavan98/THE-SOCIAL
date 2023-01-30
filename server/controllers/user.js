require("dotenv").config;
const bcrypt = require("bcrypt");
const Usermodel = require("../models/Usermodel");
const jwt = require("jsonwebtoken");

//register
exports.register = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password || !req.body.email) {
      return res.status(404).send("Please provide email,username,password");
    }
    if (await Usermodel.findOne({ email: req.body.email })) {
      return res.status(401).send("user already registered");
    }

    //generate Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //store data in DB
    const newUser = await new Usermodel({
      user: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    //collected information from frontend
    const {email, password} = req.body
    //validate
    if (!(email && password)) {
        res.status(401).send("email and password is required")
    }
  
    //check user in database
    const user = await Usermodel.findOne({email})
    //if user does not exists - assignment
    //match the password
    if(!user){
    return res.sendStatus(400).send("email or password is incorrect")
    }
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({id: user._id, email}, process.env.SECRET_KEY, {expiresIn: '2h'})
        user.password = undefined
        user.token = token

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
      return res.status(200).cookie("token", token, options).json({
            success: true,
            token,
            user
        })

    }
    //create token and send
  
} catch (error) {
    console.log(error);
}
 
  // try {
  //   const { email, password } = req.body;
  //   const user = await Usermodel.findOne({ email });

  //   if (!user) {
  //     throw new Error("User not found");
  //   } else {
  //     await bcrypt.compare(password, user.password);

  //     const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
  //       expiresIn: "2h",
  //     });
  //     user.token = token;
  //     user.password = undefined;
  //     // res.status(200).json(user);

  //     // if you want to use cookies
      

  //     const options = {
  //       expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  //       domain: 'http://localhost:3000',
  //       httpOnly: true,
  //     };
  //     res.status(200).cookie("token", token, options).json({
  //       success: true,
  //       token,
  //       user,
  //     });
   
  //   }

  //   // res.status(400).send("email or password is incorrect");
  // } catch (error) {
  //   res.send(error.message);
  //   // console.log(error);
  // }
};


exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "You are logout",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
exports.updatePassword = async (req, res) => {
  const user = await Usermodel.findOne({ _id: req.params.id });

  if (user || req.user.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        if (bcrypt.compare(user.password, req.body.password)) {
          return res
            .status(500)
            .send("Cant Update as new Password is same as Old password");
        }

        user.password = req.body.password;
        await user.save();
        return res.status(200).send("password has been updated");
      } catch (error) {
        return res.status(400).send(error.message);
      }
    } else {
      return res.status(404).send("New Password Not Found");
    }
  } else {
    return res.status(403).json("Only Admin Can Update");
  }
};

// delete a user
exports.deleteUser = async (req, res) => {
  if (req.params.id || req.user.isAdmin) {
    try {
      const user = await Usermodel.findOneAndDelete({ _id: req.params.id });

      if (!user) {
        return res
          .status(403)
          .send("Account is already deleted or invalid id in params");
      }
      return res.status(200).send("Account has been deleted");
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
  res.status(404).send("please provide user id in params");
};

//get a User
exports.getUser = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).send("User id not found in params");
    }
    const user = await Usermodel.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
};

//follow
// id in param is the user id which current user wants to follow
exports.follow = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("user not found");
  } else{
    try {
      const user = await Usermodel.findById(req.params.id);
      const currentUser = req.user;
      if(JSON.stringify(user._id) === JSON.stringify(currentUser._id)){
        return res.status(400).send("you cant follow yourself")
      }
     
      if (!user.followers.includes(currentUser._id)) {
        await user.updateOne({ $push: { followers: currentUser._id } });
        await currentUser.updateOne({ $push: { followings: currentUser._id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};

//unfollow
exports.unfollow = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("user not found");
  } else {
    try {
      // const user = await Usermodel.findById(req.params.id);
      if (req.user.followers.includes(req.params.id)) {
        await user.updateOne({ $pull: { followers: req.user._id } });
        await req.user.updateOne({ $pull: { followings: req.user._id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you already unfollowed this user");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};
