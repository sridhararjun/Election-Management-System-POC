const { voters } = require('../model/db');
const { getRegexQuery } = require('../utils');


const addNewUser = async reqBody => {
  return voters.create(reqBody);
};

const getAllUsers = async options => {
  const { constituency_id, voting_status, limit, offset, filter_by } = options;
  const queryOptions = {
    where: {}
  };
  if (filter_by) {
    queryOptions.where = {
      id: {
        $like: getRegexQuery(filter_by),
      }
    };
    // queryOptions.where.id.$like = `%${filter_by}%`;
  }
  if (constituency_id) queryOptions.where.constituency_id = constituency_id;
  if (voting_status) queryOptions.where.voting_status = voting_status;

  queryOptions.limit = parseInt(limit);
  queryOptions.offset = parseInt(offset);

  return voters.findAndCountAll(queryOptions);
};

const findUser = async id => {
  return voters.findOne({
    where: {
      id,
    },
    attributes: ['password']
  })
};

module.exports.addNewUser = addNewUser;
module.exports.getAllUsers = getAllUsers;
module.exports.findUser = findUser;
