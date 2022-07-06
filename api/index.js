const express = require("express");

const router = express.Router();

// extension of the express app, code setup for incoming request and respond
const app = express();
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request);
  Object.setPrototypeOf(res, app.response);
  req.res = res;
  res.req = req;
  next();
});

router.post("/track-data", (req, res) => {
  // write any serverside code
  console.log("Stored Data!", req.body.data); // write data result in req.body.data
  res.status(200).json({ message: "Success !" }); // send status respond and message
});
