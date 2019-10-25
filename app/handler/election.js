"use strict";

const {
  getAllMPOfStates,
  updateMPSeatsofStates,
  addNewParty,
  getAllParties,
  addNewCandidate,
  addNewVotes,
  getElectionResult
} = require("../datastore/election.js");

exports.getAllMPs = async function(req) {
  console.log(req);
  const { query } = req;
  try {
    const MPDetails = await getAllMPOfStates(query);
    return MPDetails;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

exports.updateStateMPSeatsDetails = async function(req) {
  console.log(req, " ", __filename);
  try {
    await updateMPSeatsofStates(req);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

exports.createNewPartyAndSymbol = async function(req, res, next) {
  console.log(req, " ", __filename);
  try {
    await addNewParty(req);
    next();
  } catch (e) {
    console.log(e);
    throw e;
  }
};

exports.getAllPartiesList = async function(req) {
  try {
    console.log(__filename);
    const partyDetails = getAllParties();
    return partyDetails;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

exports.registerElectionCandidate = async function(req) {
  try {
    console.log(__filename);
    console.log(req);
    await addNewCandidate(req);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

exports.resgiterVotesOnElection = async function(req) {
  try {
    await addNewVotes(req);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

exports.listRegisteredVotes = async function(req) {
  try {
    console.log(__filename);
    const electionResult = getElectionResult();
    return electionResult;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
