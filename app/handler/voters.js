"use strict";

const boom = require("boom");
const bcrypt = require("bcrypt");

const { generateToken } = require("../utils");
const {
  addNewUser,
  getAllUsers,
  findUser,
  updateVoter
} = require("../datastore/voters.js");

const validatePassword = (reqPassword, userPassword) => {
  return bcrypt.compare(reqPassword, userPassword).then(res => {
    if (res) {
      return Promise.resolve();
    }
    throw boom.badRequest("Invalid Credentials");
  });
};

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

exports.voterLogin = async reqBody => {
  try {
    console.log(__filename);
    const { voterId, password } = reqBody;
    const user = await findUser(voterId);
    console.log(user);
    if (!user) {
      throw boom.badRequest("User Not Found");
    }
    // validate password
    // await validatePassword(password, user.password);
    return await generateToken(user.id);
  } catch (e) {
    throw e;
  }
};

exports.list_All_Roles = async function(req, res) {};
