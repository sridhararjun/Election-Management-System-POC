"use strict";

const Voter = require("../model/voterModel.js");

exports.add_New_Voter = function(req, res) {
  // let new_Voter = new Voter(req.body);

  Voter.newVoters(req, function(err, voter) {
    console.log(req.body);
    // if (!req.body)
    if (err) {
      res.send(err);
    }
    res.send(voter);
  });
};

exports.list_All_Voters = function(req, res) {
  // console.log(`${__filename}: Request - ${req} \n Response - ${res}`);
  // console.log(JSON.stringify(req));
  // console.log(JSON.stringify(res));
  // console.log(req);
  Voter.getVoters(function(err, voter) {
    // console.log(`Voter.getVoters: Err - ${err} \n Voter - ${voter}`);
    // console.log(JSON.stringify(err));
    // console.log(JSON.stringify(voter));
    // console.log("List All Voters Controller");
    if (err) res.send(err);
    // console.log("res", voter);
    res.send(voter);
  });
};

exports.list_All_Roles = function(req, res) {
  console.log(`${__filename}: Request - ${req} \n Response - ${res}`);
  console.log("Async call made to Roles Controller");
  Voter.getRoles(function(err, voter) {
    // console.log(`Voter.getVoters: Err - ${err} \n Voter - ${voter}`);
    // console.log(JSON.stringify(err));
    // console.log(JSON.stringify(voter));
    // console.log("List All Voters Controller");
    if (err) res.send(err);
    // console.log("res", voter);
    res.send(voter);
  });
};
