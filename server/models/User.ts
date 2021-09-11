import bcrypt from 'bcrypt';
import {
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
} from 'sequelize';
import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';

import { SignupOrSigninReplyBody } from '../api';
import { ExtendedFastifyInstance } from '../types/fastify';
import AuthToken from './AuthToken';

// Some attributes are optional in `User.build` and `User.create` calls
@Table
export default class User extends Model {
  @AllowNull
  @Unique
  @Column(DataType.TEXT)
  public email!: string;

  @Column(DataType.TEXT)
  public password!: string;

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  public getAuthTokens!: HasManyGetAssociationsMixin<AuthToken>;
  public addAuthToken!: HasManyAddAssociationMixin<AuthToken, number>;
  public hasAuthToken!: HasManyHasAssociationMixin<AuthToken, number>;
  public countAuthTokens!: HasManyCountAssociationsMixin;
  public createAuthToken!: HasManyCreateAssociationMixin<AuthToken>;

  @HasMany(() => AuthToken)
  public authTokens?: AuthToken[];

  public static authenticate = async function (
    email: string,
    password: string,
    fastifyInstance: ExtendedFastifyInstance
  ) {
    const user = await fastifyInstance.sequelize?.models.User.findOne({
      where: { email },
    }).catch((error) => {
      throw new Error(error);
    });
    if (!user) {
      throw new Error('Invalid password');
    }

    const typedUser = user as User;
    if (user && bcrypt.compareSync(password, typedUser.password)) {
      return User.authorize(typedUser);
    }
  };

  public static authorize = async function (user: User) {
    const token = await AuthToken.generate(user.id).catch((error) => {
      throw new Error('Unable to generate auth token');
    });
    // `addAuthToken` is a generated method for 'hasMany' relationships
    await user.addAuthToken(token).catch((error) => {
      throw new Error('Unable to add auth token to user');
    });

    return {
      user: { id: user.id, email: user.email },
      token: { id: token.id, token: token.token },
    };
  };

  public static signout = async function (
    authTokenValue: string,
    fastifyInstance?: ExtendedFastifyInstance
  ) {
    fastifyInstance?.sequelize?.models.AuthToken.destroy({
      where: { token: authTokenValue },
    });
  };
}
