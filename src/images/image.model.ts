import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Portfolio } from '../portfolios/portfolio.model';

@Table({ tableName: 'images' })
export class Image extends Model<Image> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  description: string;

  @Column({ allowNull: false })
  comments: string;

  @ForeignKey(() => Portfolio)
  @Column
  portfolioId: number;

  @BelongsTo(() => Portfolio, { onDelete: 'CASCADE' })
  portfolio: Portfolio;
}
