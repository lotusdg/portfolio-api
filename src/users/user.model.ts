import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Portfolio } from '../portfolios/portfolio.model';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false })
  username: string;

  @Column({ allowNull: false })
  password: string;

  @HasMany(() => Portfolio)
  portfolios: Portfolio[];
}
