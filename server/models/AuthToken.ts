import Sequelize from 'sequelize';
import { models } from '.';
import { User } from './User';

interface AuthTokenAttributes {
  token: string;
}

interface AuthTokenCreationAttributes {}

export class AuthToken
  extends Sequelize.Model<AuthTokenAttributes, AuthTokenCreationAttributes>
  implements AuthTokenAttributes {
  public token!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public generate!: (userId: string) => void;
}

export const AuthTokenFactory = (sequelize: Sequelize.Sequelize, DataTypes) => {
  const model = sequelize.define<AuthToken>('AuthToken', {
    token: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });

  // Generates a random 15-character token & associates it with a user
  model.prototype.generate = async (userId) => {
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

    return model.create({ token });
  };

  return model;
};
