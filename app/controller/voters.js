const { createNewUser, listAllUsers } = require("../handler/voters");
const { validateSchema } = require("../utils");
const { addNewUserRequest, getUserListRequest } = require("../schema/voters");

// async await
const addNewUser = async (req, res, next) => {
  const { body } = req;
  try {
    await validateSchema(req, addNewUserRequest);
    await createNewUser(body);
    res.send({ message: "voter added successfully" });
    next();
  } catch (e) {
    return next({ status: 400, e });
  }
};

// Promise
const listUsers = async (req, res, next) => {
  const { query } = req;
  if (!query.limit) query.limit = 10;
  if (!query.offset) query.offset = 0;
  return validateSchema({ query }, getUserListRequest)
    .catch(e => {
      return next({ status: 400, e });
    })
    .then(() => {
      return listAllUsers(req);
    })
    .then(voters => {
      res.send({ total: voters.count, voterList: voters.rows });
    })
    .catch(err => {
      return next({ status: 500, err });
    });
};

//Approve Voters
const approveOrRejectVoters = async function(req, res, next) {
  const { body } = req;
};

// exporting functions

module.exports.addNewUser = addNewUser;
module.exports.listUsers = listUsers;
