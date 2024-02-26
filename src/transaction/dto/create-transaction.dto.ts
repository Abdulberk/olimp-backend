import { IsNotEmpty, IsNumber } from 'class-validator';
export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  senderId: number;

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  receiverIds: number[];

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
