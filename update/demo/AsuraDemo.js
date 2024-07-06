const cron = require("node-cron");
const axios = require("axios");
const Read = require("../../models/Read");
const User = require("../../models/Users");
const nodemailer = require("nodemailer");
require("dotenv").config();

// In-memory store to keep track of the last notified chapter
const lastNotifiedChapters = new Map(); // key: userId_title, value: chapter content

// Function to send an email
const sendEmail = async (email, subject, text) => {
  try {
    console.log(`Preparing to send email to ${email}`);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
  } catch (err) {
    console.error(`Error sending email: ${err.message}`);
  }
};

// Function to scrape and update
const scrapeAndUpdate = async (url) => {
  try {
    const response = await axios.post("http://localhost:5050/api/scrape", {
      url,
    });
    const data = response.data;

    const updatedRecord = await Read.findOneAndUpdate(
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
        imgURL: data.imgURL,
      },
      { new: true, upsert: true }
    );

    /* console.log(`Updated database for URL: ${url}`); */

    // Check for new chapters and notify users
    const users = await User.find({
      bookmark: { $elemMatch: { $eq: updatedRecord.title } },
    });

    for (const user of users) {
      const latestChapter = updatedRecord.chapter1; // assuming chapter1 is the latest

      if (latestChapter) {
        const lastNotifiedChapter = lastNotifiedChapters.get(
          `${user._id}_${updatedRecord.title}`
        );

        if (latestChapter.content !== lastNotifiedChapter) {
          console.log(
            `New chapter detected for user ${user.email}, sending email...`
          );

          await sendEmail(
            user.email,
            `New Chapter Available for ${updatedRecord.title}`,
            `A new chapter has been released for ${updatedRecord.title}. Check it out here: ${latestChapter.url}`
          );

          // Update the last notified chapter in the in-memory store
          lastNotifiedChapters.set(
            `${user._id}_${updatedRecord.title}`,
            latestChapter.content
          );
        } else {
          console.log(`No new chapter for user ${user.email}`);
        }
      }
    }
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

const scheduleScrapes = () => {
  cron.schedule("0 0 */3 * *", () => {
    console.log("Running scheduled scrape...");
    scrapeAllUrls();
  });
};

module.exports = scheduleScrapes;
