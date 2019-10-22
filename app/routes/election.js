"use strict";
// const express = require("express");
// const app = express();
const election = require("../controller/election.js");

module.exports = function(app) {
  app.route("/states").get(election.getAllMPsofStates);
  app.route("/states").put(election.updateMPSeats);

  app.route("/party").post(election.registerPartyAndSymbols);
  app.route("/party").get(election.getPartyList);
};
