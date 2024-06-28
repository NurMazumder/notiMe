const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");
const Read = require("../../models/Read");

// Function to run the Python script
const runPythonScript = (url) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", ["./scrap/AsuraScrap.py", url]);

    let dataToSend = "";
    pythonProcess.stdout.on("data", (data) => {
      dataToSend += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
      reject(data.toString());
    });

    pythonProcess.on("close", (code) => {
      if (code === 0) {
        try {
          resolve(JSON.parse(dataToSend));
        } catch (error) {
          reject("Failed to parse Python script output");
        }
      } else {
        reject(`Python script exited with code ${code}`);
      }
    });
  });
};

// @route   POST api/scrape
// @desc    Scrape a website and save data to MongoDB
// @access  Public
router.post("/", async (req, res) => {
  const { url } = req.body;

  console.log(`Received URL: ${url}`);

  try {
    // Check if the URL already exists in the database
    let existingEntry = await Read.findOne({ URL: url });
    if (existingEntry) {
      // If exists, update the existing entry
      const chapters = await runPythonScript(url);
      console.log(`Scraped data: ${JSON.stringify(chapters, null, 2)}`);

      const cleanedTitle = chapters[0].title.replace("Chapter", "").trim(); // Clean title

      existingEntry.chapter1 = {
        content: chapters[0].chapter_number,
        url: chapters[0].link,
        releaseDate: chapters[0].release_date,
      };
      existingEntry.chapter2 = {
        content: chapters[1].chapter_number,
        url: chapters[1].link,
        releaseDate: chapters[1].release_date,
      };
      existingEntry.chapter3 = {
        content: chapters[2].chapter_number,
        url: chapters[2].link,
        releaseDate: chapters[2].release_date,
      };
      existingEntry.chapter4 = {
        content: chapters[3].chapter_number,
        url: chapters[3].link,
        releaseDate: chapters[3].release_date,
      };
      existingEntry.chapter5 = {
        content: chapters[4].chapter_number,
        url: chapters[4].link,
        releaseDate: chapters[4].release_date,
      };
      existingEntry.title = cleanedTitle;
      existingEntry.from = "source";
      existingEntry.noti = false;
      existingEntry.imgURL = chapters[0].img_url;

      const updatedRead = await existingEntry.save();
      return res.json(updatedRead);
    }

    // If not, scrape the website and save the data
    const chapters = await runPythonScript(url);
    console.log(`Scraped data: ${JSON.stringify(chapters, null, 2)}`);

    const cleanedTitle = chapters[0].title.replace("Chapter", "").trim(); // Clean title

    const newRead = new Read({
      chapter1: {
        content: chapters[0].chapter_number,
        url: chapters[0].link,
        releaseDate: chapters[0].release_date,
      },
      chapter2: {
        content: chapters[1].chapter_number,
        url: chapters[1].link,
        releaseDate: chapters[1].release_date,
      },
      chapter3: {
        content: chapters[2].chapter_number,
        url: chapters[2].link,
        releaseDate: chapters[2].release_date,
      },
      chapter4: {
        content: chapters[3].chapter_number,
        url: chapters[3].link,
        releaseDate: chapters[3].release_date,
      },
      chapter5: {
        content: chapters[4].chapter_number,
        url: chapters[4].link,
        releaseDate: chapters[4].release_date,
      },
      title: cleanedTitle,
      from: "source",
      noti: false,
      URL: url,
      imgURL: chapters[0].img_url,
    });

    const savedRead = await newRead.save();
    res.json(savedRead);
  } catch (err) {
    console.error("Error in scraping route:", err);
    res.status(500).json({ error: err });
  }
});

// @route   GET api/scrape
// @desc    Get the scraped data from MongoDB by URL
// @access  Public
router.get("/", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL query parameter is required" });
  }

  try {
    const data = await Read.findOne({ URL: url });
    if (!data) {
      return res
        .status(404)
        .json({ error: "Data not found for the given URL" });
    }
    res.json(data);
  } catch (err) {
    console.error("Error in retrieving data:", err);
    res.status(500).json({ error: err.message });
  }
});

// @route   GET api/scrape
// @desc    Get the scraped data from MongoDB by title
// @access  Public
router.get("/title", async (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ error: "Title query parameter is required" });
  }

  try {
    // Decoding the title to handle spaces and special characters
    const decodedTitle = decodeURIComponent(title);

    const data = await Read.findOne({ title: decodedTitle });
    if (!data) {
      return res
        .status(404)
        .json({ error: "Data not found for the given title" });
    }
    res.json(data);
  } catch (err) {
    console.error("Error in retrieving data:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
