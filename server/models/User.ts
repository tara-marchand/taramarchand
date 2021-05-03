import bcrypt from 'bcrypt';
import Sequelize, {
  Association,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  Optional,
} from 'sequelize';

import { AuthToken } from './AuthToken';

export interface UserAttributes {
  email: string;
  id?: number;
  password: string;
}

// Some attributes are optional in `User.build` and `User.create` calls
export interface UserCreationAttributes
  extends Optional<UserAttributes, 'id'> {}

export class User
  extends Sequelize.Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public email!: string;
  public password!: string; // for nullable fields

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  public getAuthTokens!: HasManyGetAssociationsMixin<AuthToken>; // Note the null assertions!
  public addAuthToken!: HasManyAddAssociationMixin<AuthToken, number>;
  public hasAuthToken!: HasManyHasAssociationMixin<AuthToken, number>;
  public countAuthTokens!: HasManyCountAssociationsMixin;
  public createAuthToken!: HasManyCreateAssociationMixin<AuthToken>;

  public static associations: {
    authTokens: Association<User, AuthToken>;
  };

  public static authenticate: (email: string, password: string) => any;
  public static authorize: () => any;
  public static logout: () => any;
}

export const UserFactory = (sequelize: Sequelize.Sequelize, DataTypes) => {
  const model = sequelize.define<User, UserAttributes>('User', {
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });

  model.hasMany(sequelize.models.AuthToken);

  model.prototype.authenticate = async function (
    email: string,
    password: string
  ) {
    const user = await this.findOne({ where: { email } });

    if (bcrypt.compareSync(password, this.password)) {
      return this.authorize();
    }
    throw new Error('Invalid password');
  };

  model.prototype.authorize = async function () {
    const authTokenInstance = sequelize.models.AuthToken.build() as AuthToken;
    const token = await authTokenInstance.generate(this.id);

    // `addAuthToken` is a generated method for 'hasMany' relationships
    await this.addAuthToken(token);

    return { user: this, token };
  };

  model.prototype.logout = async function (token) {
    sequelize.models.AuthToken.destroy({ where: { token } });
  };

  return model;
};
