"use strict";

const {
  getAllMPOfStates,
  updateMPSeatsofStates,
  addNewParty,
  getAllParties
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
    // next(res);
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
