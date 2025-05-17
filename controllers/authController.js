const userModel = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    const { email, password, fullname } = req.body;

    let findUser = await userModel.findOne({ email: email });

    if (findUser) {
      return (
        req.flash("error", "User already exists, please login!"),
        res.redirect("/")
      );
    }

    // Validate input
    if (!email || !password || !fullname) {
      return req.flash("error", "All fields required!"), res.redirect("/");
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

    req.flash("success", "User created successfully!");
    res.redirect("/shop");
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports.loginUser = async (req, res) => {
  let { email, password } = req.body;

  let User = await userModel.findOne({ email: email });

  if (!User) {
    return req.flash("error", "User doesnt exits"), res.redirect("/");
  }

  bcrypt.compare(password, User.password, (err, result) => {
    if (result) {
      let token = generateToken(User);
      res.cookie("token", token);
      req.flash("success", "your are logged in."), res.redirect("/shop");
    } else {
      req.flash("error", "wrong password!"), res.redirect("/");
    }
  });
};

module.exports.logoutUser = (req, res)=>{
  res.cookie("token", "");
  res.redirect("/");
}
