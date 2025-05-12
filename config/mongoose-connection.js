// db.js

const mongoose = require("mongoose");
const config = require("config")
const dbgr = require("debug")("development:mongoose");



// Mongoose Connection
mongoose
  .connect(`${config.get("MONGODB_URI")}/scatch`)
  .then(() => {
    dbgr("🟢 Database connected successfully");
  })
  .catch((err) => {
    console.error("🔴 Database connection error:", err);
    process.exit(1);
  });


// Export the connection
module.exports = mongoose.connection;
