module.exports = ((sequelize, DataTypes) => {
  return sequelize.define(
    'role',
    {
      id: {
        field: 'id',
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      role_name: {
        field: 'role_name',
        type: DataTypes.STRING(25),
        allowNull: false,
      }
    },
    {
      tableName: 'role',
      freezeTableName: true,
      underscored: true,
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      engine: 'InnoDB',
      charset: 'utf8',
    },
  );
});
