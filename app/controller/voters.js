const {
  createNewUser,
  listAllUsers,
  updateVoterApprovalStatus,
  voterLogin,
  list_All_Roles,
  list_All_Constituencies
} = require("../handler/voters");
const { validateSchema, validateToken } = require("../utils");
const {
  addNewUserRequest,
  getUserListRequest,
  loginVoter,
  approveVoterRequest
} = require("../schema/voters");

// async await
const addNewUser = async (req, res, next) => {
  // const {
  //   body,
  //   headers: { authorization }
  // } = req;
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
  console.log(__filename);
  // const { reqBody: params, body } = req;
  const reqBody = {
    params: req.params,
    body: req.body
  };
  console.log(reqBody);
  try {
    // await validateSchema(params, approveVoterRequest);
    await validateSchema(params, approveVoterRequest);
    const voterDetail = await updateVoterApprovalStatus(reqBody);
    res.send({ message: "Voter updated successfully!!!" });
  } catch (e) {
    return next({ status: 400, e });
  }
};

// login
const login = async (req, res, next) => {
  const { body } = req;
  console.log("Login ", __filename);
  console.log(body);
  try {
    await validateSchema(req, loginVoter);
    const resp = await voterLogin(body);
    console.log("response from login handler ", resp);
    res.send(200, resp);
    next();
  } catch (e) {
    return next({ status: 500, e });
  }
};

const getRolesList = async (req, res, next) => {
  const roleList = await list_All_Roles();
  res.send(roleList);
  console.log(roleList);
};

const getConstituencyList = async (req, res, next) => {
  const constituencyList = await list_All_Constituencies();
  res.send(constituencyList);
  console.log(constituencyList);
};
// exporting functions

module.exports.addNewUser = addNewUser;
module.exports.listUsers = listUsers;
module.exports.login = login;
module.exports.approveOrRejectVoters = approveOrRejectVoters;
module.exports.getRolesList = getRolesList;
module.exports.getConstituencyList = getConstituencyList;
