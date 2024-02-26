import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { EntityManager, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction, TransactionStatus } from './entities/transaction.entity';
import { Person } from 'src/person/entities/person.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import axios from 'axios';
import { ExchangeStatus } from './enums/exchange-status.enum';
import { Currency } from 'src/bank/entities/bank.entity';
import { CurrencyExchangeResultDto } from './dto/exchange-response.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    private configService: ConfigService,
  ) {}
  async processTransactions(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const { senderId, receiverIds, amount } = createTransactionDto;

    return this.transactionRepository.manager.transaction(
      async (transactionManager) => {
        const startTime = Date.now();
        const sender = await this.getPersonWithBank(senderId);
        const receivers = await this.getReceiversWithBank(
          receiverIds,
          transactionManager,
        );

        this.validateSenderBalance(sender, amount, receivers.length);
        const transaction = this.createTransaction(amount, sender, receivers);

        await transactionManager.save(transaction);

        this.updateSenderBalance(
          sender,
          amount,
          transactionManager,
          receivers.length,
        );

        await this.updateReceiversBalance(
          sender,
          receivers,
          amount,
          transactionManager,
        );

        const endTime = Date.now();
        const timeTaken = endTime - startTime;
        console.log(`Time taken to process transaction: ${timeTaken}ms`);

        return {
          processedIn: `${timeTaken}ms`,
          ...transaction,
        };
      },
    );
  }

  private async getPersonWithBank(personId: number): Promise<Person> {
    const person = await this.personRepository.findOne({
      where: { id: personId },
      relations: ['bank'],
    });
    if (!person) {
      throw new NotFoundException('Sender not found');
    }
    return person;
  }

  private async getReceiversWithBank(
    receiverIds: number[],
    transactionManager: EntityManager,
  ): Promise<Person[]> {
    return transactionManager.find(Person, {
      where: { id: In(receiverIds) },
      relations: ['bank'],
    });
  }

  private validateSenderBalance(
    sender: Person,
    amount: number,
    receiverCount: number,
  ): void {
    const totalAmount = amount * receiverCount;
    if (sender.bank.balance < totalAmount) {
      throw new BadRequestException('Insufficient balance in sender account');
    }
  }

  private createTransaction(
    amount: number,
    sender: Person,
    receivers: Person[],
  ): Transaction {
    const transaction = new Transaction();
    transaction.amount = amount;
    transaction.sender = sender;
    transaction.receivers = receivers;
    transaction.status = TransactionStatus.SUCCESS;
    transaction.bank = sender.bank;
    return transaction;
  }

  private updateSenderBalance(
    sender: Person,
    amount: number,
    transactionManager: EntityManager,
    receiverCount: number,
  ): void {
    sender.bank.balance -= amount * receiverCount;
    sender.bank.balance = parseFloat(sender.bank.balance.toFixed(2));
    transactionManager.save(sender.bank);
  }

  private async updateReceiversBalance(
    sender: Person,
    receivers: Person[],
    amount: number,
    transactionManager: EntityManager,
  ): Promise<void> {
    for (const receiver of receivers) {
      if (receiver.bank.currency !== sender.bank.currency) {
        await this.handleCurrencyConversion(
          receiver,
          sender.bank.currency,
          amount,
          transactionManager,
        );
      } else {
        this.updateSameCurrencyReceiverBalance(
          receiver,
          amount,
          transactionManager,
        );
      }
    }
  }

  private async handleCurrencyConversion(
    receiver: Person,
    fromCurrency: Currency,
    amount: number,
    transactionManager: EntityManager,
  ): Promise<void> {
    const { result, conversion_result } = await this.getExchangeRate(
      fromCurrency,
      receiver.bank.currency,
      amount,
    );

    if (result === ExchangeStatus.SUCCESS) {
      receiver.bank.balance += conversion_result;
      receiver.bank.balance = parseFloat(receiver.bank.balance.toFixed(2));
      await transactionManager.save(receiver.bank);
    } else {
      throw new BadRequestException(
        'Invalid currency code or unable to fetch exchange rate',
      );
    }
  }

  private updateSameCurrencyReceiverBalance(
    receiver: Person,
    amount: number,
    transactionManager: EntityManager,
  ): void {
    receiver.bank.balance += amount;
    receiver.bank.balance = parseFloat(receiver.bank.balance.toFixed(2));
    transactionManager.save(receiver.bank);
  }

  private async getExchangeRate(
    from: Currency,
    to: Currency,
    amount: number,
  ): Promise<CurrencyExchangeResultDto> {
    const baseUrl = this.configService.get<string>('EXCHANGE_API_BASE_URL');
    const response = await axios.get<CurrencyExchangeResultDto>(
      `${baseUrl}/${from}/${to}/${amount}`,
    );
    const resultDto: CurrencyExchangeResultDto = response.data;

    if (resultDto.result !== ExchangeStatus.SUCCESS) {
      throw new BadRequestException(
        'Invalid currency code or unable to fetch exchange rate',
      );
    }

    return resultDto;
  }

  findAll() {
    return `This action returns all transaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  async getUsersRecentTransactions(personId: number): Promise<Transaction[]> {
    return this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.receivers', 'receivers')
      .leftJoinAndSelect('transaction.sender', 'sender')
      .where('sender.id = :personId', { personId })
      .orderBy('transaction.createdAt', 'DESC')
      .take(5)
      .getMany();
  }
}
