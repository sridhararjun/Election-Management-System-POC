const bCrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "voters",
    {
      id: {
        field: "id",
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: false
      },
      name: {
        field: "name",
        type: DataTypes.STRING(50),
        allowNull: false
      },
      roles: {
        field: "roles",
        type: DataTypes.INTEGER(11),
        references: {
          model: "role",
          key: "id"
        },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION"
      },
      constituency_id: {
        field: "constituency_id",
        type: DataTypes.INTEGER(11),
        references: {
          model: "constituency",
          key: "id"
        },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      voting_status: {
        field: "voting_status",
        type: DataTypes.BOOLEAN,
        default: false
      },
      address: {
        field: "address",
        type: DataTypes.STRING(255),
        allowNull: false
      },
      approval_status: {
        field: "approval_status",
        type: DataTypes.BOOLEAN,
        default: false
      },
      password: {
        field: "password",
        type: DataTypes.STRING(255),
        allowNull: false
      },
      party_id: {
        field: "party_id",
        type: DataTypes.INTEGER(11),
        allowNull: true,
        default: null,
        references: {
          model: "party",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }
    },
    {
      tableName: "voters",
      freezeTableName: true,
      underscored: true,
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      engine: "InnoDB",
      charset: "utf8"
    }
    // {
    //   hooks: {
    //     onCreate: function(voters, options, cb) {
    //       console.log(voters, "5555555");
    //       {
    //         voters.password =
    //           voters.password && voters.password != ""
    //             ? bCrypt.hashSync(voters.password, 10)
    //             : "";
    //       }
    //       return cb(null, options);
    //     }
    //   }
    // }
  );
};
