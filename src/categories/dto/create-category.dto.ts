import { IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  userId?: number;
}
