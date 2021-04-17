const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = function User(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4(),
      primaryKey: true,
      unique: true,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });

  User.associate = function (models) {
    User.hasMany(models.AuthToken);
  };

  // Class method
  User.authenticate = async function (email, password) {
    const user = await User.findOne({ where: { email } });

    if (bcrypt.compareSync(password, user.password)) {
      return user.authorize();
    }
    throw new Error('Invalid password');
  };

  // Instance method
  User.prototype.authorize = async function () {
    const { AuthToken } = sequelize.models;
    const user = this;

    const authToken = await AuthToken.generate(user.id);
    // `addAuthToken` is a generated method for 'hasMany' relationships
    await user.addAuthToken(authToken);

    return { user, authToken };
  };

  User.prototype.logout = async function (token) {
    sequelize.models.AuthToken.destroy({ where: { token } });
  };

  return User;
};
