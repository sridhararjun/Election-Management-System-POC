const joi = require("joi");
const jwt = require("jsonwebtoken");

// import internal files
const { jwt_secret } = require("../config");
const { voters } = require("../model/db");

module.exports.validateSchema = (req, schema) => console.log(__filename);
new Promise((resolve, reject) => {
  console.log(__filename);
  // console.log("req ", req);
  const { body: reqBody, query } = req;
  // console.log("body ", body);
  // console.log("reqBody ", reqBody);
  if (reqBody) {
    console.log("reqBody ", reqBody);
    joi.validate(reqBody, schema, (err, res) => {
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

module.exports.validateToken = token =>
  new Promise((resolve, reject) => {
    if (token) {
      let user_id = null;
      jwt.verify(token, jwt_secret.key, (err, authData) => {
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
            id: user_id,
            active: true
          }
        })
        .then(user => {
          if (user) {
            return resolve(user.id);
          }
          return reject({
            status: 403,
            message: "Forbidden"
          });
        });
    }
    return reject({
      status: 403,
      message: "Forbidden"
    });
  });

// async await

module.exports.generateToken = async userId => {
  const jwtTokenObj = {
    sub: userId
  };
  /*  { expiresIn: '86400s' } */
  jwt.sign(
    jwtTokenObj,
    jwt_secret.key,
    { expiresIn: "86400s" },
    (err, token) => {
      if (err) {
        throw err;
      }
      return resolve({
        authToken: token
      });
    }
  );
};
