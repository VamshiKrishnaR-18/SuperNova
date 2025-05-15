const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async (req, res, next) => {
  try {
    // Check for token
    const token = req.cookies.token;
    if (!token) {
      req.flash("error", "Please login first!");
      return res.redirect("/");
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    res.locals.user = decoded;

    // Fetch the user without password
    const user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");

    // If user doesn't exist, redirect with error
    if (!user) {
      req.flash("error", "User not found. Please login again.");
      return res.redirect("/");
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (err) {
    console.error("Authentication Error:", err);
    req.flash("error", "Something went wrong!");
    res.redirect("/");
  }
};
