"use strict";

const ems = require("../controller/voters.js");

module.exports = function (app) {

  app.route("/voters").post(ems.addNewUser);
  app.route("/voters").get(ems.listUsers);
  app.route("/login").post(ems.login);
};
