const joi = require('joi');

module.exports.validateSchema = (req, schema) => {
  const { body: reqBody, query } = req;
  if (reqBody) {
    return new Promise((resolve, reject) => {
      joi.validate(reqBody, schema, (err, res) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(res);
        }
      })
    });
  }
  if (query) {
    return new Promise((resolve, reject) => {
      joi.validate(query, schema, (err, res) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(res);
        }
      })
    });
  }
};
