const express = require("express");
const connectDB = require("./config/db");
const app = express();

// Connect to database
connectDB();

// Middleware
//app.use(cors());
app.use(express.json({ extended: false }));

// Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
