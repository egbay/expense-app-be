import { UserEntity } from "../../auth/entities/user.entity";
// import { Category } from "../../categories/entities/category.entity";
import { TransactionType } from "@prisma/client";

export class Transaction {
  id: number;
  userId: number;
  categoryId: number;
  type: TransactionType;
  amount: number;
  description?: string;
  transactionDate: Date;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  user?: UserEntity;
  // category?: Category;
}
