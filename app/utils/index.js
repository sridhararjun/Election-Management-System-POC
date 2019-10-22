const joi = require("joi");

module.exports.validateSchema = (req, schema) => {
  const { body: reqBody, query } = req;
  console.log(req, " ", __filename);
  if (reqBody) {
    console.log(__filename);
    return new Promise((resolve, reject) => {
      joi.validate(reqBody, schema, (err, res) => {
        if (err) {
          console.log("Validate Schema Failed -", err);
          return reject(err);
        } else {
          console.log("passed");
          return resolve(res);
        }
      });
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
      });
    });
  }
};
