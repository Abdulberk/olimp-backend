import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from 'src/bank/entities/bank.entity';
import { Person } from 'src/person/entities/person.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bank, Person, Transaction])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
