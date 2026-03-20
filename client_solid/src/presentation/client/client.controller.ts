import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  ParseIntPipe,
  HttpStatus,
  Patch,
  HttpException,
} from '@nestjs/common';
import type { CreateClientDTO } from './dto/create.client.dto';
import { CreateClienteUseCase } from '@/application/usecases/create-client.usecase';
import { GetClientUseCase } from '@/application/usecases/get-client.usecase';
import { ClientResponseDto } from './dto/client-response.dto';
import { UpdateEmailUseCase } from '@/application/usecases/update-email.usecase';

@Controller('/clients')
export class ClientController {
  constructor(
    private readonly createClientUseCase: CreateClienteUseCase,
    private readonly getClientUseCase: GetClientUseCase,
    private readonly updateEmailUseCase: UpdateEmailUseCase,
  ) {}

  @Post()
  save(@Body() createClientDto: CreateClientDTO): Promise<ClientResponseDto> {
    return this.createClientUseCase.execute(createClientDto);
  }

  @Patch('/change-email/:id')
  async changeEmail(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
    @Body('email')
    email: string,
  ) {
    try {
      return await this.updateEmailUseCase.execute(id, email);
    } catch (err) {
      if (err.name === 'ClientPermissionError') {
        return new HttpException(err.message, HttpStatus.METHOD_NOT_ALLOWED);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ): Promise<ClientResponseDto | ClientResponseDto[]> {
    return await this.getClientUseCase.execute(id);
  }

  @Get()
  async find(): Promise<
    ClientResponseDto | ClientResponseDto[] | HttpException
  > {
    try {
      return await this.getClientUseCase.execute();
    } catch (err) {
      if (err.name === 'ClientNotFoundError') {
        return new HttpException(err.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
