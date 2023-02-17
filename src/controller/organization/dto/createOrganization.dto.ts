import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrganizationDto {
  readonly id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'ООО Чайка' })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Фролов Вадим Вадимовчи' })
  readonly directorFullName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ example: 'test@mail.ru' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '+7 965 451 87 12' })
  readonly phone: string;
}
