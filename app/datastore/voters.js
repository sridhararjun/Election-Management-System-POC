const { voters, role, constituency } = require("../model/db");
const { getRegexQuery } = require("../utils");
const bCrypt = require("bcrypt");
// const Op = sequelize;
const addNewUser = async reqBody => {
  console.log(reqBody);
  reqBody.password = bCrypt.hashSync(reqBody.password, bCrypt.genSaltSync(10));
  console.log(reqBody);
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
        $like: getRegexQuery(filter_by)
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
      id
    },
    attributes: ["password"]
  });
};

const updateVoter = async (reqBody, response) => {
  // console.log(__filename);
  return voters.update(
    { approval_status: reqBody.body.approval_status },
    { returning: true, where: { id: reqBody.params.id } }
  );
  // .then(function(result) {
  //   console.log(result, "-----------------");
  // });
};

const getRoles = async () => {
  return role.findAll({
    where: {
      id: {
        $notIn: [3]
      }
    },
    attributes: ["id", "role_name"]
  });
};

const getConstituencies = async () => constituency.findAll();

module.exports.addNewUser = addNewUser;
module.exports.getAllUsers = getAllUsers;
module.exports.findUser = findUser;
module.exports.updateVoter = updateVoter;
module.exports.getRoles = getRoles;
module.exports.getConstituencies = getConstituencies;
