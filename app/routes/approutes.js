"use strict";
module.exports = function(app) {
  const ems = require("../handler/voterHandler.js");

  app.route("/voters").get(ems.list_All_Voters);

  app.route("/roles").get(ems.list_All_Roles);

  app.route("/voters/new").post(ems.add_New_Voter);
};
