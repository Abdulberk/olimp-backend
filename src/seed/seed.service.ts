import { Injectable } from '@nestjs/common';
import { Bank } from 'src/bank/entities/bank.entity';
import { Person } from 'src/person/entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from 'src/transaction/entities/transaction.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Bank)
    private bankRepository: Repository<Bank>,
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async seedAll(): Promise<void> {
    await this.clearAll().then(() => {
      console.log('Cleared all data');
      this.seedBanks().then(() => {
        console.log('Seeded banks');
        this.seedPerson().then(() => {
          console.log('Seeded persons');
        });
      });
    });
  }
  private async seedBanks(): Promise<void> {
    const banks = [
      { name: 'Bank of America', balance: 10000.0 },
      { name: 'Chase', balance: 2000.0 },
      { name: 'Wells Fargo', balance: 3000.0 },
      { name: 'Citi', balance: 4000.0 },
    ];

    for (const bank of banks) {
      const bankEntity = this.bankRepository.create(bank);
      await this.bankRepository.save(bankEntity);
    }
  }

  private async seedPerson(): Promise<void> {
    const banks = await this.bankRepository.find();

    const persons = [
      { id: 10, name: 'John' },
      { id: 11, name: 'Doe' },
      { id: 12, name: 'Jane' },
      { id: 13, name: 'Doe' },
    ];

    for (let i = 0; i < persons.length; i++) {
      const person = persons[i];
      const bank = banks[i % banks.length];
      const personEntity = this.personRepository.create({
        id: person.id,
        name: person.name,
        bank: bank,
      });

      await this.personRepository.save(personEntity);
    }
  }

  async clearAll(): Promise<void> {
    await this.transactionRepository.delete({});
    await this.personRepository.delete({});
    await this.bankRepository.delete({});
  }
  
}
