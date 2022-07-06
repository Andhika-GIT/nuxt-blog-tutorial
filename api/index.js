const express = require("express");

const router = express.Router();

router.post("/track-data", (req, res) => {
  // write any serverside code
  console.log("Stored Data!", req.body.data); // write data result in req.body.data
  res.status(200).json({ message: "Success !" }); // send status respond and message
});
