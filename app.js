const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.status(200).json({
    slackUsername: "diac",
    backend: true,
    age: 12,
    bio: "This should be a description of me... I guess.",
  });
});

app.listen(process.env.PORT || 8000, () => console.log("Server Up"));
