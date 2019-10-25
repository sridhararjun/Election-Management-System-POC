"use strict";

const ems = require("../controller/voters.js");

module.exports = function(app) {
  app.route("/register").post(ems.addNewUser);
  app.route("/voters").get(ems.listUsers);
  // app.route("/voters/new").post(ems.addNewUser);
  app.route("/login").post(ems.login);

  app.route("/voters/:id").put(ems.approveOrRejectVoters);

  app.route("/roles").get(ems.getRolesList);

  app.route("/constituency").get(ems.getConstituencyList);
};
