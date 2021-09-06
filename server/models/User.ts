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
    const user = (await fastifyInstance.sequelize?.models.User.findOne({
      where: { email },
    })) as User;

    if (user && bcrypt.compareSync(password, user.password)) {
      return User.authorize(user);
    }
    throw new Error('Invalid password');
  };

  public static authorize = async function (user: User) {
    const token = await AuthToken?.generate(user.id);
    // `addAuthToken` is a generated method for 'hasMany' relationships
    await user.addAuthToken(token);

    return { user, token };
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
