"use strict";

const {
  getAllMPs,
  updateStateMPSeatsDetails,
  createNewPartyAndSymbol,
  getAllPartiesList,
  registerElectionCandidate,
  resgiterVotesOnElection,
  listRegisteredVotes
} = require("../handler/election.js");
const { validateSchema } = require("../utils");
const {
  getStateMPRequest,
  updateMPSeatsCountRequest,
  registerPartyRequest,
  registerCandidateRequest
} = require("../schema/election.js");

//promise based
const getAllMPsofStates = async function(req, res, next) {
  const { query } = req;
  if (!query.limit) query.limit = 10;
  if (!query.offset) query.offset = 0;
  console.log(req.query);
  console.log(query);
  console.log(query.limit);
  return validateSchema({ query }, getStateMPRequest)
    .catch(function(err) {
      return next({ status: 400, err });
    })
    .then(function() {
      return getAllMPs(req);
    })
    .then(function(stateList) {
      return res.send(stateList);
    })
    .catch(err => {
      return res.send({ status: 500, err });
    });
};

//Asysnc Await based
const updateMPSeats = async function(req, res, next) {
  const { body } = req;
  console.log(body, " Request Body");
  try {
    // await validateSchema(body, updateMPSeatsCountRequest);
    await updateStateMPSeatsDetails(body);
    res.send({ message: "MP Seats updated successfully!!!!" });
    next();
  } catch (e) {
    return next({ status: 400, e });
  }
};

const registerPartyAndSymbols = async (req, res, next) => {
  const { body } = req;
  console.log(__filename);
  try {
    await validateSchema(body, registerPartyRequest);
    await createNewPartyAndSymbol(body);
    res.send({ message: "Party created successfully!!!" });
  } catch (e) {
    console.log(__filename, " at ", e);
    return next({ status: 404, e });
  }
  //   return validateSchema(body, registerPartyRequest)
  //     .catch(e => {
  //       console.log(e, " -----");
  //       return next({ status: 400, e });
  //     })
  //     .then(() => {
  //       return createNewPartyAndSymbol(body);
  //     })
  //     .then(results => {
  //       res.send(results);
  //     })
  //     .catch(err => {
  //       return next(err);
  //     });
};

const getPartyList = async function(req, res, next) {
  const parties = await getAllPartiesList(req);
  //   console.log(parties, "Parties Response");
  res.send(parties);
};

const registerCandidates = async function(req, res, next) {
  const { body } = req;
  console.log(__filename);
  console.log(body);
  try {
    // await validateSchema(body, registerCandidateRequest);
    await registerElectionCandidate(body);
    res.send({ message: "Candidate Registered Successfully!!!" });
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const registerVotes = async function(req, res, next) {
  const { body } = req;
  console.log(__filename);
  console.log(body);
  try {
    await resgiterVotesOnElection(body);
    res.send({ message: "Votes Added" });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

const getElectionResult = async function(req, res, next) {
  try {
    const result = await listRegisteredVotes();
    res.send(result);
    next();
  } catch (e) {
    console.log(e);
    throw e;
  }
};
module.exports.getAllMPsofStates = getAllMPsofStates;
module.exports.updateMPSeats = updateMPSeats;
module.exports.registerPartyAndSymbols = registerPartyAndSymbols;
module.exports.getPartyList = getPartyList;
module.exports.registerCandidates = registerCandidates;
module.exports.registerVotes = registerVotes;
module.exports.getElectionResult = getElectionResult;
