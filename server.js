const express = require("express");
const connectDB = require("./config/db");
const scheduleScrapes = require("./update/demo/AsuraDemo");
const path = require("path");

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

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Adjust the path to correctly serve the static files
  app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

  // Catch-all handler to serve React's index.html for any non-API route
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Start the scheduled scraping task
scheduleScrapes();
