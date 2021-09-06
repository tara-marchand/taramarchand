import { Model, ModelCtor } from 'sequelize-typescript';

import AuthToken from './AuthToken';
import Book from './Book';
import User from './User';

const models: ModelCtor<Model>[] = [AuthToken, Book, User];

export default models;
