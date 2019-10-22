module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "party",
    {
      id: {
        field: "id",
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      party_name: {
        field: "party_name",
        type: DataTypes.STRING(75),
        allowNull: false
      },
      symbol_id: {
        field: "symbol_id",
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "symbol",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }
    },
    {
      tableName: "party",
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
