import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  ParseIntPipe,
  HttpStatus,
  Patch,
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
  changeEmail(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
    @Body('email')
    email: string,
  ) {
    return this.updateEmailUseCase.execute(id, email);
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ): Promise<ClientResponseDto | ClientResponseDto[]> {
    return this.getClientUseCase.execute(id);
  }

  @Get()
  find(): Promise<ClientResponseDto | ClientResponseDto[]> {
    return this.getClientUseCase.execute();
  }
}
