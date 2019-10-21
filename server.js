const express = require("express");
const app = express();
const body_Parser = require("body-parser");
const port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log(`App started and Listening on ${port}`);
});

app.use(body_Parser.urlencoded({ extended: true }));
app.use(body_Parser.json());

const routes = require("./app/routes/approutes.js");
routes(app);

// process.on("uncaughtException", app.close());
