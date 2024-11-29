import { IsNotEmpty, IsNumber, IsDateString, IsDecimal } from "class-validator";
import { Type } from "class-transformer";

export class CreateBudgetDto {
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsNotEmpty()
  @IsDecimal()
  @Type(() => Number)
  amount: number;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;
}
