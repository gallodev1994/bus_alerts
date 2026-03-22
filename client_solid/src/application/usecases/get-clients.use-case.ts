import { Inject, Injectable } from '@nestjs/common';
import type { ClientReadRepository } from '@/domain/repositories/client.repository';
import type { ClientResponseDto } from '@/presentation/client/dto/client-response.dto';
import { CLIENT_REPOSITORY } from '@/shared/tokens/client.repository.token';
import { ClientMapper } from '@/application/mappers/client.mapper';

@Injectable()
export class GetClientsUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: ClientReadRepository,
  ) {}

  async execute(): Promise<ClientResponseDto[]> {
    const clients = await this.clientRepository.list();

    return ClientMapper.toDTOList(clients);
  }
}
