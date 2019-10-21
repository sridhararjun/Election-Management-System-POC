"use strict";
const sqlConnection = require("./db.js");

const Voter = function(voter) {
  this.id = voter.id;
  this.name = voter.name;
  this.roles = voter.roles;
  this.constituency = voter.constituency;
  this.voting_status = voter.voting_status;
  this.address = voter.address;
};

// Voter.registerVoter = function(newVoter, result) {
//   sqlConnection.query("Insert into voters ");
// };

Voter.getVoters = function(result) {
  sqlConnection.query("Select * from voters", function(err, res) {
    if (err) {
      console.log("Error occurred when trying to fetch voters. - ", err);
      result(err, null);
    } else {
      console.log("List of Voters:\n", res);
      result(null, res);
    }
  });
};

Voter.getRoles = function(result) {
  sqlConnection.query("Select * from role", function(err, res) {
    if (err) {
      //   console.log("Error occurred when trying to fetch voters. - ", err);
      result(err, null);
    } else {
      //   console.log("List of Voters:\n", res);
      result(null, res);
    }
  });
};

Voter.newVoters = function(req, res) {
  // const sql = `Insert into voters (id,name,roles,constituency,voting_status,address) values ${req.body.id},${req.body.name},${req.body.roles}.${req.body.constituency},${req.body.voting_status},${req.body.address}`;
  sqlConnection.query("Insert into voters set ?", req.body, function(
    error,
    results
  ) {
    if (error) {
      res(error, null);
    } else {
      res(null, results);
    }
  });
};

module.exports = Voter;
