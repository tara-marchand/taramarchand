// Sequelize model for a job.
function Job(sequelize, DataTypes) {
  const Job = sequelize.define(
    'Job',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      company: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      title: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: 'jobs',
    }
  );

  return Job;
}

module.exports = Job;
