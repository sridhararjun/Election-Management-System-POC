module.exports = ((sequelize, DataTypes) => {
  return sequelize.define(
    'constituency',
    {
      id: {
        field: 'id',
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      state_id: {
        field: 'state_id',
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'states',
          key: 'id'
        }
      },
      constituency_name: {
        field: 'constituency_name',
        type: DataTypes.STRING(25),
        allowNull: false,
      }
    },
    {
      tableName: 'constituency',
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

