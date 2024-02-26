import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Person } from '../../person/entities/person.entity';
import { Bank } from '../../bank/entities/bank.entity';

export enum TransactionStatus {
  SUCCESS = 'success',
  IDLE = 'idle',
  FAILED = 'failed',
}

@Entity()
export class Transaction {
  constructor(partial?: Partial<Transaction>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Bank, (bank) => bank.transactions)
  @JoinColumn()
  bank: Bank;

  @ManyToOne(() => Person, (person) => person.sendings)
  @JoinColumn()
  sender: Person;

  @ManyToMany(() => Person, (person) => person.receivings)
  @JoinTable()
  receivers: Person[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.IDLE,
  })
  status: TransactionStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
