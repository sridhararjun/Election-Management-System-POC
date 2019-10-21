module.exports = ((sequelize, DataTypes) => {
  return sequelize.define(
    'voters',
    {
      id: {
        field: 'id',
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
      },
      name: {
        field: 'name',
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      roles: {
        field: 'roles',
        type: DataTypes.INTEGER(11),
        references: {
          model: 'role',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      },
      constituency_id: {
        field: 'constituency_id',
        type: DataTypes.INTEGER(11),
        references: {
          model: 'constituency',
          key: 'id'
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      voting_status: {
        field: 'voting_status',
        type: DataTypes.TINYINT(1),
        default: false,
      },
      address: {
        field: 'address',
        type: DataTypes.STRING(255),
        allowNull: false,
      }
    },
    {
      tableName: 'voters',
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
