const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const app = express();
const path = require("path");
dotenv.config();
const PORT = 8080;

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// database connection
mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Middlewares & Routes
app.use(express.json()); // server can now accept json request
app.use(cookieParser()); // server can parse and use cookies
app.use("/api/user", require("./routes/user.route.js"));
app.use("/api/auth", require("./routes/auth.route.js"));
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.json({ success: false, message, statusCode });
});

app.listen(PORT, () => console.log(`Server Running on ${PORT}....`));
