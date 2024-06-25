const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/Users");

// @route POST api/bookmark
// @desc Add bookmark read
// @access Private
router.post("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { readId } = req.body;

    if (!readId) {
      return res.status(400).json({ msg: "readId is required" });
    }

    console.log("userId:", userId);
    console.log("readId:", readId);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (!user.bookmark) {
      user.bookmark = [];
    }

    if (user.bookmark.includes(readId)) {
      return res.status(400).json({ msg: "Read already in bookmark" });
    }

    user.bookmark.push(readId);
    await user.save();

    res.json({ msg: "Read added to bookmark successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/bookmark/retrieve
// @desc Get bookmark reads
// @access Private
router.get("/retrieve", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user by ID
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Ensure the bookmark field is initialized
    if (!user.bookmark) {
      user.bookmark = [];
    }

    // Send the bookmark list
    res.json(user.bookmark);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route DELETE api/bookmark/delete/:id
// @desc Delete bookmark read
// @access Private
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const readId = req.params.id;

    // Find the user by ID
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Ensure the bookmark field is initialized
    if (!user.bookmark) {
      user.bookmark = [];
    }

    // Check if the readId is in the bookmark list
    if (!user.bookmark.includes(readId)) {
      return res.status(400).json({ msg: "Read not in bookmark" });
    }

    // Remove the readId from the bookmark list
    user.bookmark = user.bookmark.filter((read) => read !== readId);
    await user.save();

    res.json({ msg: "Read removed from bookmark" });
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Not found" });
    }
    res.status(500).send("Server error");
  }
});

module.exports = router;
