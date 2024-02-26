import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('/batch-process')
  createNewTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.processTransactions(createTransactionDto);
  }

  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Get('recent-transactions/:id')
  getRecentTransactions(@Param('id') id: number) {
    return this.transactionService.getUsersRecentTransactions(+id);
  }
}


