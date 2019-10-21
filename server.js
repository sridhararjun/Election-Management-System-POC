const express = require("express");
const app = express();
const body_Parser = require("body-parser");
const db = require('./app/model/db');
const port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log(`App started and Listening on ${port}`);
});

db.sequelize.sync().then(() => {
  console.log('tables created')
}).catch(e => console.log(e));

app.use(body_Parser.urlencoded({ extended: true }));
app.use(body_Parser.json());

const routes = require("./app/routes/approutes.js");
routes(app);
