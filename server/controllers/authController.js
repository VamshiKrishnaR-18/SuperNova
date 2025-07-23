const userModel = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    const { email, password, fullname } = req.body;

    let findUser = await userModel.findOne({ email: email });

    if (findUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists, please login!"
      });
    }

    // Validate input
    if (!email || !password || !fullname) {
      return res.status(400).json({
        success: false,
        message: "All fields required!"
      });
    }

    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = await userModel.create({
      email,
      password: hashedPassword,
      fullname,
    });

    let token = generateToken(user);
    res.cookie("token", token);

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email
      }
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    let User = await userModel.findOne({ email: email });

    if (!User) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exist"
      });
    }

    bcrypt.compare(password, User.password, (err, result) => {
      if (result) {
        let token = generateToken(User);
        res.cookie("token", token);
        res.status(200).json({
          success: true,
          message: "You are logged in successfully!",
          user: {
            id: User._id,
            fullname: User.fullname,
            email: User.email
          }
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Wrong password!"
        });
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

module.exports.logoutUser = (req, res)=>{
  res.cookie("token", "");
  res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });
}
