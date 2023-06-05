import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { User } from '../users/user.model';
import { Image } from '../images/image.model';

@Table({ tableName: 'portfolios' })
export class Portfolio extends Model<Portfolio> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  description: string;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: number;

  @BelongsTo(() => User, { onDelete: 'CASCADE' })
  user: User;

  @HasMany(() => Image)
  images: Image[];
}
