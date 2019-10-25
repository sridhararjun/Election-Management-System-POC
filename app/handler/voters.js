"use strict";

const boom = require("boom");
const bcrypt = require("bcrypt");

const { generateToken } = require("../utils");
const {
  addNewUser,
  getAllUsers,
  findUser,
  updateVoter,
  getRoles,
  getConstituencies
} = require("../datastore/voters.js");

const validatePassword = (reqPassword, userPassword) =>
  new Promise((resolve, reject) => {
    return bcrypt.compare(reqPassword, userPassword).then(res => {
      if (res) {
        return resolve();
      }
      throw boom.badRequest("Invalid Credentials");
    });
  });

exports.createNewUser = async req => {
  try {
    req.voting_status = false;
    await addNewUser(req);
  } catch (e) {
    console.log(e);
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
    if (!user) {
      throw boom.badRequest("User Not Found");
    }
    // validate password
    await validatePassword(password, user.password);
    const token = await generateToken(user.id);
    console.log("token", token);
    return token;
  } catch (e) {
    throw e;
  }
};

exports.list_All_Roles = async (req, res) => {
  try {
    const rolesList = await getRoles();
    // console.log(rolesList, "rolesList");
    return rolesList;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

exports.list_All_Constituencies = async (req, res) => {
  try {
    const constituencyList = await getConstituencies();
    return constituencyList;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
