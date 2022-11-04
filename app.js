const express = require("express");
const csv = require("csvtojson");
const axios = require("axios");
const { formatData } = require("./utils");
const csvFilePath = "./csv.csv";

const app = express();

app.get("/", async (req, res) => {
  try {
    const teams = [];
    // get the json
    let jsonArray = await csv({ noheader: true }).fromFile(csvFilePath);
    // remove the first rows
    jsonArray.shift();
    // get the team names
    jsonArray.forEach((el) => {
      el.field1 && teams.push(el.field1);
    });
    // remove the team name from the list
    jsonArray = jsonArray.filter((el) => !isNaN(el.field1));
    formatData(jsonArray, teams);
    return res.status(200).json({
      message: "Success. Files are in the 'Files' directory",
      jsonArray,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "An error occured", error: err.message });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  // Make the request as soon as the server is up!
  await axios.get("http://localhost:8000/");
  console.log("Server Up");
});
