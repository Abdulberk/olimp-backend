import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  findAll() {
    return this.personService.findAll();
  }

  @Get('bank-account/:id')
  getBankOfPerson(@Param('id') id: number) {
    return this.personService.getBankOfPerson(+id);
  }

  @Get('all-persons')
  getAllPersonsWithBank() {
    return this.personService.getAllPersons();
  }

 
}