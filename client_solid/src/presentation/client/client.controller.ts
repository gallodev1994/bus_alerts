import { Controller, Get, Body, Post, Query, Param } from '@nestjs/common';
import { Client } from '@/domain/entities/client.entity';
import type { CreateClientDTO } from './dto/create.client.dto';
import { CreateClienteUseCase } from '@/application/usecases/create-client.usecase';
import { GetClientUseCase } from '@/application/usecases/get-client.usecase';

@Controller('/clients')
export class ClientController {
  constructor(
    private readonly createClientUseCase: CreateClienteUseCase,
    private readonly getClientUseCase: GetClientUseCase,
  ) {}

  @Post()
  save(@Body() createClientDto: CreateClientDTO): Promise<Client> {
    return this.createClientUseCase.execute(createClientDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getClientUseCase.execute(id);
  }

  @Get()
  find() {
    return this.getClientUseCase.execute();
  }
}
