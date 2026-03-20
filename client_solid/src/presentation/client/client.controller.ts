import { Controller, Get, Body, Post, Param } from '@nestjs/common';
import type { CreateClientDTO } from './dto/create.client.dto';
import { CreateClienteUseCase } from '@/application/usecases/create-client.usecase';
import { GetClientUseCase } from '@/application/usecases/get-client.usecase';
import { ClientResponseDto } from './dto/client-response.dto';

@Controller('/clients')
export class ClientController {
  constructor(
    private readonly createClientUseCase: CreateClienteUseCase,
    private readonly getClientUseCase: GetClientUseCase,
  ) {}

  @Post()
  save(@Body() createClientDto: CreateClientDTO): Promise<ClientResponseDto> {
    return this.createClientUseCase.execute(createClientDto);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ): Promise<ClientResponseDto | ClientResponseDto[]> {
    return this.getClientUseCase.execute(id);
  }

  @Get()
  find(): Promise<ClientResponseDto | ClientResponseDto[]> {
    return this.getClientUseCase.execute();
  }
}
