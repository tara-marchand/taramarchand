import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';

import User from './User';

@Table
export default class AuthToken extends Model {
  @Unique
  @Column
  public token!: string;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user?: User;

  /**
   * Generates a random 15-character token & associates it with a user
   */
  public static generate = (userId: number) => {
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

  public toString = (): string => this.token;
}
