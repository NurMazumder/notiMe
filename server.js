const express = require("express");

const connectDB = require("./config/db");

const app = express();

// Connect to database
connectDB();

app.get("/", (req, res) => res.send("API running"));

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
