const { sendTestEmail } = require("./update/demo/AsuraDemo");

sendTestEmail()
  .then(() => {
    console.log("Test email process completed.");
  })
  .catch((err) => {
    console.error(`Error in sending test email: ${err.message}`);
  });
