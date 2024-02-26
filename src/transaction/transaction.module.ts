import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Transaction } from './entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/person/entities/person.entity';
import { ConfigModule } from 'libs/common/src';
@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Person]), ConfigModule],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
