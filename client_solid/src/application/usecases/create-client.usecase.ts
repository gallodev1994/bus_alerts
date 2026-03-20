import { Inject } from '@nestjs/common';
import { CLIENT_REPOSITORY } from '@/shared/tokens/client.repository.token';
import type { ClientRepository } from '@/domain/repositories/client.repository';

import type { ClientResponseDto } from '@/presentation/client/dto/client-response.dto';
import { Client } from '@/domain/entities/client.entity';
import { ClientMapper } from '../mappers/client.mapper';

export class CreateClienteUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: ClientRepository,
  ) {}

  async execute(client: Client): Promise<ClientResponseDto> {
    const savedClient = await this.clientRepository.save(client);
    return ClientMapper.toDTO(savedClient);
  }
}
