module.exports = ((sequelize, DataTypes) => {
  return sequelize.define(
    'candidates',
    {
      id: {
        field: 'id',
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      voter_id: {
        field: 'voter_id',
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'voters',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      party_id: {
        field: 'party_id',
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'party',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },

    },
    {
      tableName: 'candidates',
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
