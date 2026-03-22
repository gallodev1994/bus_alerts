import { Inject } from '@nestjs/common';
import { CLIENT_REPOSITORY } from '@/shared/tokens/client.repository.token';
import type { ClientReadRepository } from '@/domain/repositories/client.repository';
import { ClientMapper } from '@/application/mappers/client.mapper';
import { ClientByEmailNotFoundError } from '@/domain/errors';
import { ClientResponseDto } from '@/presentation/client/dto/client-response.dto';

export class GetClientByEmailUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: ClientReadRepository,
  ) {}

  async execute(email: string): Promise<ClientResponseDto> {
    const client = await this.clientRepository.getByEmail(email);
    if (!client) {
      throw new ClientByEmailNotFoundError(email);
    }

    return ClientMapper.toDTO(client);
  }
}
