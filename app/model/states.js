module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "states",
    {
      id: {
        field: "id",
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      state_name: {
        field: "state_name",
        type: DataTypes.STRING(25),
        allowNull: false
      },
      mp_count: {
        field: "mp_count",
        type: DataTypes.INTEGER(11),
        default: 1,
        allowNull: false
      }
    },
    {
      tableName: "states",
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
