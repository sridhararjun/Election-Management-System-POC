module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "symbol",
    {
      id: {
        field: "id",
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: false
      },
      symbol_image: {
        field: "symbol_image",
        type: DataTypes.STRING(255),
        allowNull: false
      }
    },
    {
      tableName: "symbol",
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
