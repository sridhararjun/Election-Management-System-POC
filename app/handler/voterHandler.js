"use strict";

const Voter = require("../datastore/voterModel.js");

exports.add_New_Voter = function (req, res) {

  // Voter.newVoters(req, function (err, voter) {
  //   console.log(req.body);
  //   // if (!req.body)
  //   if (err) {
  //     res.send(err);
  //   } else {
  //     res.send(voter);
  //   }
  // });
};

exports.list_All_Voters = function (req, res) {
  // Voter.getVoters(function (err, voter) {
  //   if (err) res.send(err);
  //   // console.log("res", voter);
  //   res.send(voter);
  // });
};

exports.list_All_Roles = function (req, res) {
  // console.log(`${__filename}: Request - ${req} \n Response - ${res}`);
  // console.log("Async call made to Roles Controller");
  // Voter.getRoles(function (err, voter) {
  //   if (err) res.send(err);
  //   res.send(voter);
  // });
};
