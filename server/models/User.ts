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
}
