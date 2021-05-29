import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';

import { User } from './User';

@Table
class AuthToken extends Model {
  @Unique
  @Column
  public token!: string;

  @CreatedAt
  public readonly createdAt!: Date;
  
  @UpdatedAt
  public readonly updatedAt!: Date;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user?: User;

  public generate!: (userId: number) => Promise<AuthToken>;
}

// Generates a random 15-character token & associates it with a user
AuthToken.prototype.generate = async (userId) => {
  if (!userId) {
    throw new Error('AuthToken requires a user ID');
  }

  const possibleCharacters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';

  for (let i = 0; i < 15; i++) {
    token += possibleCharacters.charAt(
      Math.floor(Math.random() * possibleCharacters.length)
    );
  }

  return AuthToken.create({ token });
};

export { AuthToken };
