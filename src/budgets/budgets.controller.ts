import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ParseIntPipe,
  Query,
} from "@nestjs/common";
import { BudgetsService } from "./budgets.service";
import { CreateBudgetDto } from "./dto/create-budget.dto";
import { UpdateBudgetDto } from "./dto/update-budget.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("budgets")
@UseGuards(JwtAuthGuard)
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Post()
  create(@Request() req, @Body() createBudgetDto: CreateBudgetDto) {
    return this.budgetsService.create(req.user.userId, createBudgetDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.budgetsService.findByUserId(req.user.userId);
  }

  @Get("active")
  findActiveBudgets(@Request() req) {
    return this.budgetsService.findActiveBudgets(req.user.userId);
  }

  @Get("category/:categoryId")
  findByCategory(
    @Request() req,
    @Param("categoryId", ParseIntPipe) categoryId: number
  ) {
    return this.budgetsService.findByCategory(categoryId, req.user.userId);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.budgetsService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateBudgetDto: UpdateBudgetDto,
    @Request() req
  ) {
    return this.budgetsService.update(id, req.user.userId, updateBudgetDto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number, @Request() req) {
    return this.budgetsService.remove(id, req.user.userId);
  }
}
