export default (sequelize, DataTypes) => {
  const AuthToken = sequelize.define(
    'AuthToken',
    {
      token: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {}
  );

  AuthToken.associate = function (models) {
    AuthToken.belongsTo(models.User);
  };

  // Generates a random 15-character token & associates it with a user
  AuthToken.generate = async function (userId) {
    if (!userId) {
      throw new Error('AuthToken requires a user ID');
    }

    const possibleCharacters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';

    for (var i = 0; i < 15; i++) {
      token += possibleCharacters.charAt(
        Math.floor(Math.random() * possibleCharacters.length)
      );
    }

    return AuthToken.create({ token, userId });
  };

  return AuthToken;
};
