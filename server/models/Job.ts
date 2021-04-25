export default function Job(sequelize, DataTypes) {
  return sequelize.define(
    'Job',
    {
      id: {
        allowNull: false,
        type: DataTypes.TEXT,
        primaryKey: true,
      },
      applied: {
        type: DataTypes.TEXT,
      },
      company: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      created: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      link: {
        type: DataTypes.TEXT,
      },
      role: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: 'jobs',
    }
  );
};
