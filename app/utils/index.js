const joi = require("joi");
const jwt = require('jsonwebtoken');

// import internal files
const { jwt_secret } = require('../config');
const { voters } = require('../model/db');

module.exports.validateSchema = (req, schema) => new Promise((resolve, reject) => {
  const { body: reqBody, query } = req;
  if (reqBody) {
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

module.exports.validateToken = token => new Promise((resolve, reject) => {
  if (token) {
    let user_id = null;
    jwt.verify(token, jwt_secret.key, (err, authData) => {
      if (err) {
        return reject({
          status: 403,
          message: 'Forbidden'
        })
      }
      user_id = authData.sub;
    });
    return voters.findOne({
      where: {
        id: user_id,
        active: true
      }
    })
      .then((user) => {
        if (user) {
          return resolve(user.id);
        }
        return reject({
          status: 403,
          message: 'Forbidden'
        })
      })
  }
  return reject({
    status: 403,
    message: 'Forbidden'
  })
});

// async await

module.exports.generateToken = async userId => {
  const jwtTokenObj = {
    sub: userId,
  };
  /*  { expiresIn: '86400s' } */
  jwt.sign(jwtTokenObj, jwt_secret.key, { expiresIn: '86400s' }, (err, token) => {
    if (err) {
      throw err;
    }
    return resolve({
      authToken: token,
    })
  })
};
