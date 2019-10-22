const joi = require("joi");

module.exports.getStateMPRequest = {
  limit: joi.number().default(10),
  offset: joi.number().default(0),
  filter_by: joi.string()
};

module.exports.updateMPSeatsCountRequest = {
  id: joi.number().required(),
  state_name: joi.string().required(),
  mp_count: joi.number().required()
};

module.exports.registerPartyRequest = {
  id: joi.number().required,
  party_name: joi.string().required,
  symbol_id: joi.number().required
};
