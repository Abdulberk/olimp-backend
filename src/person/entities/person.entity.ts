import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { Transaction } from '../../transaction/entities/transaction.entity';
import { Bank } from 'src/bank/entities/bank.entity';

@Entity()
export class Person {
  constructor(partial: Partial<Person>) {
    Object.assign(this, partial);
  }

  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Bank)
  @JoinColumn()
  bank: Bank;

  @ManyToMany(() => Transaction, (transaction) => transaction.sender)
  sendings: Transaction[];

  @ManyToMany(() => Transaction, (transaction) => transaction.receivers)
  receivings: Transaction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
