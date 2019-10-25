const joi = require("joi");
const jwt = require("jsonwebtoken");

// import internal files
const { jwt_secret } = require("../config");
const { voters } = require("../model/db");

module.exports.validateSchema = (req, schema) => {
  return new Promise((resolve, reject) => {
    console.log(__filename);
    // console.log("req ", req);
    const { body, query } = req;
    console.log("body *****(*", body);
    if (body) {
      joi.validate(body, schema, (err, res) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(res);
        }
      });
    }
    if (query) {
      joi.validate(query, schema, (err, res) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(res);
        }
      });
    }
  });
};
module.exports.validateToken = token => {
  console.log(token);
  return new Promise((resolve, reject) => {
    if (token) {
      let user_id = null;
      jwt.verify(token, jwt_secret.key, (err, authData) => {
        console.log(authData, "%#$");
        if (err) {
          return reject({
            status: 403,
            message: "Forbidden"
          });
        }
        user_id = authData.sub;
      });
      return voters
        .findOne({
          where: {
            id: user_id
          }
        })
        .then(user => {
          if (user) {
            return resolve(user.id);
          }
          return reject({
            status: 401,
            message: "UnAuthorized"
          });
        });
    }
    return reject({
      status: 401,
      message: "UnAuthorized"
    });
  });
};
// async await

module.exports.generateToken = userId =>
  new Promise((resolve, reject) => {
    const jwtTokenObj = {
      id: 1
    };
    /*  { expiresIn: '86400s' } */
    jwt.sign("id", jwt_secret.key, (err, token) => {
      if (err) {
        console.log(err);
        throw err;
      }
      return resolve({
        authToken: token
      });
    });
  });
