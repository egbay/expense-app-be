import { UserEntity } from "../../auth/entities/user.entity";
import { Category } from "../../categories/entities/category.entity";

export class Budget {
  id: number;
  userId: number;
  categoryId: number;
  amount: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  user?: UserEntity;
  category?: Category;
}
