import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export default class Book extends Model {
  @Column(DataType.TEXT)
  public authors!: string;

  @Column(DataType.TEXT)
  public title!: string;
}
