import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Bank } from 'src/bank/entities/bank.entity';
import { NotFoundException } from '@nestjs/common';
import { Transaction } from 'src/transaction/entities/transaction.entity';
@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  findAll() {
    return `This action returns all person`;
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  async getBankOfPerson(personId: number): Promise<Bank | string> {
    const getBank = await this.personRepository.findOne({
      where: { id: personId },
      relations: ['bank'],
    });
    if (!getBank) {
      throw new NotFoundException('Person not found');
    }
    return getBank.bank;
  }


  async getAllPersons() {
    const getPersons = await this.personRepository.find({
      select: ['id', 'name'],
      
    });
    return getPersons
  }
}
