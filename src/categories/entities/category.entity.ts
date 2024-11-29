import { Transaction } from "../../transactions/entities/transaction.entity";
import { UserEntity } from "../../auth/entities/user.entity";
// import { Budget } from "../../budgets/entities/budget.entity";

export class Category {
  id: number;
  name: string;
  userId?: number;
  user?: UserEntity;
  transactions?: Transaction[];
  // budgets?: Budget[];
}
