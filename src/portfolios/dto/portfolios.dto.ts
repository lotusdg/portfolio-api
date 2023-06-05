import { IsString, IsNumber } from 'class-validator';

export class CreatePortfolioDto {
  @IsNumber()
  userId: number;

  @IsString()
  name: string;

  @IsString()
  description: string;
}
