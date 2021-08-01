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

  public static authenticate: (
    email: string,
    password: string
  ) => Promise<{ user: User; token: AuthToken }>;

  public static authorize: (
    user: User
  ) => Promise<{ user: User; token: AuthToken }>;

  public static signout: (authTokenValue: string) => Promise<void>;
}

User.authenticate = async function (email: string, password: string) {
  const user = await User.findOne({ where: { email } });

  if (user && bcrypt.compareSync(password, user.password)) {
    return User.authorize(user);
  }
  throw new Error('Invalid password');
};

User.authorize = async function (user: User) {
  const authTokenInstance = AuthToken.build();
  const token = await authTokenInstance.generate(user.id);

  // `addAuthToken` is a generated method for 'hasMany' relationships
  await user.addAuthToken(token);

  return { user, token };
};

User.signout = async function (authTokenValue: string) {
  AuthToken.destroy({ where: { token: authTokenValue } });
};
