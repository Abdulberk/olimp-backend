import { Module } from '@nestjs/common';

import { DatabaseModule } from '../libs/common/src';
import { TransactionModule } from './transaction/transaction.module';
import { PersonModule } from './person/person.module';
import { BankModule } from './bank/bank.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    DatabaseModule,
    TransactionModule,
    PersonModule,
    BankModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
