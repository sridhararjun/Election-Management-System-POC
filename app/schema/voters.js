const joi = require("joi");

module.exports.addNewUserRequest = {
  id: joi.number().required(),
  name: joi
    .string()
    .required()
    .description("name of the voter"),
  roles: joi
    .number()
    .min(1)
    .required(),
  constituency_id: joi.number().required(),
  address: joi.string().required(),
  password: joi.string().required()
};

module.exports.getUserListRequest = {
  limit: joi.number().default(10),
  offset: joi.number().default(0),
  filter_by: joi.string(),
  constituency_id: joi.number(),
  voting_status: joi.boolean().default(false)
};
