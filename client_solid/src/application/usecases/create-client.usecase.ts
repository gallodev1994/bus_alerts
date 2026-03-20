import { Inject } from '@nestjs/common';
import { CLIENT_REPOSITORY } from '@/application/tokens/client.repository.token';
import type { ClientRepository } from '@/domain/repositories/client.repository';
import type { CreateClientDTO } from '@/presentation/client/dto/create.client.dto';
import type { ClientResponseDto } from '@/presentation/client/dto/client-response.dto';

export class CreateClienteUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: ClientRepository,
  ) {}

  async execute(createClientDto: CreateClientDTO): Promise<ClientResponseDto> {
    const savedClient = await this.clientRepository.save(createClientDto);
    return {
      ...savedClient,
      fetchDateTime: new Date(Date.now()),
    };
  }
}
