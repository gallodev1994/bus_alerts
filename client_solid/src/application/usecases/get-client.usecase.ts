import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { ClientRepository } from '@/domain/repositories/client.repository';
import type { ClientResponseDto } from '@/presentation/client/dto/client-response.dto';
import { CLIENT_REPOSITORY } from '@/application/tokens/client.repository.token';
import { ClientMapper } from '@/application/mappers/client.mapper';

@Injectable()
export class GetClientUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: ClientRepository,
  ) {}

  async execute(id?: string): Promise<ClientResponseDto | ClientResponseDto[]> {
    if (id) {
      const clientById = await this.clientRepository.getById(id);
      if (!clientById) {
        // Usa exceção específica do NestJS
        throw new NotFoundException(`Client with id ${id} not found`);
      }

      return ClientMapper.toDTO(clientById);
    }

    const clients = await this.clientRepository.list();    

    return ClientMapper.toDTOList(clients);
  }
}
