module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "electionDay",
    {
      id: {
        field: "id",
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      candidate_id: {
        field: "candidate_id",
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "candidates",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      votes_registered: {
        field: "votes_registered",
        type: DataTypes.INTEGER(11),
        allowNull: true
      }
    },
    {
      tableName: "electionDay",
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
  );
};
