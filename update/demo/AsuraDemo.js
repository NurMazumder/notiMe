const cron = require("node-cron");
const axios = require("axios");
const Read = require("../../models/Read");

// Function to scrape each URL and update DB
const scrapeAndUpdate = async (url) => {
  try {
    const response = await axios.post("http://localhost:5050/api/scrape", {
      url,
    });
    const data = response.data;

    // Update the database with the new data
    await Read.findOneAndUpdate(
      { URL: url },
      {
        chapter1: data.chapter1,
        chapter2: data.chapter2,
        chapter3: data.chapter3,
        chapter4: data.chapter4,
        chapter5: data.chapter5,
        title: data.title,
        from: data.from,
        noti: data.noti,
        URL: data.URL,
      },
      { new: true, upsert: true }
    );

    console.log(`Updated database for URL: ${url}`);
  } catch (err) {
    console.error(`Error scraping URL ${url}: ${err.message}`);
  }
};

// Function to scrape all URLs
const scrapeAllUrls = async () => {
  try {
    const urls = await Read.find({}, "URL"); // Get all URLs from the database

    for (const record of urls) {
      await scrapeAndUpdate(record.URL);
    }
  } catch (err) {
    console.error(`Error fetching URLs from DB: ${err.message}`);
  }
};

// Schedule task to run every 2 minutes
const scheduleScrapes = () => {
  cron.schedule("*/2 * * * *", () => {
    console.log("Running scheduled scrape...");
    scrapeAllUrls();
  });
};

module.exports = scheduleScrapes;
