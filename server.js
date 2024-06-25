const express = require("express");
const connectDB = require("./config/db");
const scheduleScrapes = require("./update/demo/AsuraDemo");
const cors = require("cors");

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json({ extended: false }));

// Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/scrape", require("./routes/api/scrape"));
app.use("/api/bookmark", require("./routes/api/bookmark"));

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Start the scheduled scraping task
scheduleScrapes();
