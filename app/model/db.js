"use strict";

const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");

const sequelize = new Sequelize("parliament_election", "root", "root", {
  host: "localhost",
  dialect: "mysql"
});

const db = {};

sequelize
  .authenticate()
  .then(() => {
    console.log("sequelize database connected successfully");
  })
  .catch(err => {
    console.log("database error", JSON.stringify(err));
  });

fs.readdirSync(__dirname)
  .filter(file => {
    console.log(file.indexOf("."));
    return file.indexOf(".") !== 0 && file !== "db.js";
  })
  .forEach(file => {
    let model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.constituency.belongsTo(db.states, {
  as: "states",
  foreignKey: "state_id",
  targetKey: "id"
});

db.voters.belongsTo(db.role, { as: "role", foreignKey: "roles" });
db.voters.belongsTo(db.constituency, {
  as: "constituency",
  foreignKey: "constituency_id",
  targetKey: "id"
});

db.party.belongsTo(db.symbol, {
  as: "symbol",
  foreignKey: "symbol_id",
  targetKey: "id"
});

db.candidates.belongsTo(db.voters, {
  as: "voters",
  foreignKey: "voter_id",
  targetKey: "id"
});
db.candidates.belongsTo(db.party, {
  as: "party",
  foreignKey: "party_id",
  targetKey: "id"
});
db.electionDay.belongsTo(db.candidates, {
  as: "candidates",
  foreignKey: "candidate_id",
  targetKey: "id"
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
