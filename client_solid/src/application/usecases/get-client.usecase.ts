import { Inject, Injectable, Logger } from '@nestjs/common';
import type { ClientReadRepository } from '@/domain/repositories/client.repository';
import type { ClientResponseDto } from '@/presentation/client/dto/client-response.dto';
import { CLIENT_REPOSITORY } from '@/shared/tokens/client.repository.token';
import { ClientMapper } from '@/application/mappers/client.mapper';
import { ClientNotFoundError } from '@/domain/errors/client-not-found.error';

@Injectable()
export class GetClientUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: ClientReadRepository,
  ) {}

  async execute(id?: string): Promise<ClientResponseDto | ClientResponseDto[]> {
    if (id) {
      const clientById = await this.clientRepository.getById(id);
      if (!clientById) {
        // Usa exceção específica do NestJS
        throw new ClientNotFoundError(id);
      }

      return ClientMapper.toDTO(clientById);
    }

    const clients = await this.clientRepository.list();

    return ClientMapper.toDTOList(clients);
  }
}
