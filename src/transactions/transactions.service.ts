import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async create(createTransactionDto: CreateTransactionDto) {
    return this.prisma.transaction.create({
      data: createTransactionDto,
      include: {
        category: true,
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.transaction.findMany({
      include: {
        category: true,
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
      include: {
        category: true,
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    return transaction;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    try {
      return await this.prisma.transaction.update({
        where: { id },
        data: updateTransactionDto,
        include: {
          category: true,
          user: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      });
    } catch (error) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.transaction.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
  }
}
