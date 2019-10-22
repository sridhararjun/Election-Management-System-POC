const express = require("express");
const app = express();
const body_Parser = require("body-parser");
const db = require("./app/model/db");
const port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log(`App started and Listening on ${port}`);
});

db.sequelize
  .sync()
  .then(() => {
    console.log("tables created");
  })
  .catch(e => console.log(e));

app.use(body_Parser.urlencoded({ extended: true }));
app.use(body_Parser.json());

const routes = require("./app/routes/voters.js");
const elecitonroutes = require("./app/routes/election.js");
routes(app);
elecitonroutes(app);

app.use(function(req, res, next) {
  next();
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development

  res.send(err.status || 500, err);
  // render the error page
  // res.render('error');
});
