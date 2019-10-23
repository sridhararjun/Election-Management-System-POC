const { states, party, candidates, electionDay } = require("../model/db");

const getAllMPOfStates = async options => {
  const { limit, offset, filter_by } = options;
  const queryOptions = {
    where: {}
  };
  queryOptions.limit = parseInt(options.limit);
  return states.findAndCountAll(queryOptions);
};

const updateMPSeatsofStates = async reqBody => {
  return states.update(
    { mp_count: reqBody.mp_count },
    { where: { id: reqBody.id } }
  );
};

const addNewParty = async reqBody => {
  return party.create(reqBody);
};

const getAllParties = async () => {
  console.log(party.findAndCountAll, "Find and count all");
  return party.findAndCountAll();
};

const addNewCandidate = async reqBody => {
  console.log(__filename);
  console.log(reqBody);
  return candidates.create(reqBody);
};

const addNewVotes = async reqBody => {
  return electionDay.create(reqBody);
};

const getElectionResult = async () => {
  return electionDay.findAndCountAll();
};
module.exports.getAllMPOfStates = getAllMPOfStates;
module.exports.updateMPSeatsofStates = updateMPSeatsofStates;
module.exports.addNewParty = addNewParty;
module.exports.getAllParties = getAllParties;
module.exports.addNewCandidate = addNewCandidate;
module.exports.addNewVotes = addNewVotes;
module.exports.getElectionResult = getElectionResult;
