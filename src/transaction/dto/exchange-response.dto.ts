import { IsNumber, IsString, IsEnum } from 'class-validator';
import { ExchangeStatus } from '../enums/exchange-status.enum';

export class CurrencyExchangeResultDto {
  @IsEnum(ExchangeStatus)
  result: ExchangeStatus;

  @IsNumber()
  conversion_result: number;
}
