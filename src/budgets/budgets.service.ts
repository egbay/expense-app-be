import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateBudgetDto } from "./dto/create-budget.dto";
import { UpdateBudgetDto } from "./dto/update-budget.dto";

@Injectable()
export class BudgetsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, createBudgetDto: CreateBudgetDto) {
    // Tarih kontrolü
    if (
      new Date(createBudgetDto.endDate) <= new Date(createBudgetDto.startDate)
    ) {
      throw new BadRequestException("End date must be after start date");
    }

    return this.prisma.budget.create({
      data: {
        ...createBudgetDto,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        category: true,
      },
    });
  }

  async findAll() {
    return this.prisma.budget.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        category: true,
      },
    });
  }

  async findOne(id: number) {
    const budget = await this.prisma.budget.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        category: true,
      },
    });

    if (!budget) {
      throw new NotFoundException(`Budget with ID ${id} not found`);
    }

    return budget;
  }

  async update(id: number, userId: number, updateBudgetDto: UpdateBudgetDto) {
    // Önce bütçenin var olduğunu ve kullanıcıya ait olduğunu kontrol et
    const budget = await this.prisma.budget.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!budget) {
      throw new NotFoundException(
        `Budget with ID ${id} not found or not authorized`
      );
    }

    // Tarih kontrolü (eğer tarihler güncellenmişse)
    if (updateBudgetDto.startDate && updateBudgetDto.endDate) {
      if (
        new Date(updateBudgetDto.endDate) <= new Date(updateBudgetDto.startDate)
      ) {
        throw new BadRequestException("End date must be after start date");
      }
    }

    return this.prisma.budget.update({
      where: { id },
      data: updateBudgetDto,
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        category: true,
      },
    });
  }

  async remove(id: number, userId: number) {
    // Önce bütçenin var olduğunu ve kullanıcıya ait olduğunu kontrol et
    const budget = await this.prisma.budget.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!budget) {
      throw new NotFoundException(
        `Budget with ID ${id} not found or not authorized`
      );
    }

    return this.prisma.budget.delete({
      where: { id },
    });
  }

  async findByUserId(userId: number) {
    return this.prisma.budget.findMany({
      where: { userId },
      include: {
        category: true,
      },
    });
  }

  async findByCategory(categoryId: number, userId: number) {
    return this.prisma.budget.findMany({
      where: {
        categoryId,
        userId,
      },
      include: {
        category: true,
      },
    });
  }

  async findActiveBudgets(userId: number) {
    const currentDate = new Date();
    return this.prisma.budget.findMany({
      where: {
        userId,
        startDate: {
          lte: currentDate,
        },
        endDate: {
          gte: currentDate,
        },
      },
      include: {
        category: true,
      },
    });
  }
}
