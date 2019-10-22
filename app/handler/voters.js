"use strict";

const {
  addNewUser,
  getAllUsers,
  updateVoter
} = require("../datastore/voters.js");

exports.createNewUser = async req => {
  try {
    req.voting_status = false;
    await addNewUser(req);
  } catch (e) {
    throw e;
  }
};

exports.listAllUsers = async req => {
  const { query } = req;
  try {
    const voters = await getAllUsers(query);
    return voters;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

exports.updateVoterApprovalStatus = async function(req) {
  try {
    console.log(__filename);
    const voters = await updateVoter(req);
    console.log(voters, "--voters");
    return voters;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

exports.list_All_Roles = async function(req, res) {};
