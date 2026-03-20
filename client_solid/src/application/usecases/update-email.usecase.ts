import type { ClientRepository } from '@/domain/repositories/client.repository';
import { ClientResponseDto } from '@/presentation/client/dto/client-response.dto';
import { Inject, Logger } from '@nestjs/common';
import { ClientMapper } from '../mappers/client.mapper';
import { EmailVO } from '@/domain/value-objects/email.vo';
import { ClientNotFoundError } from '@/domain/errors/client-not-found.error';
import { CLIENT_REPOSITORY } from '@/shared/tokens/client.repository.token';

export class UpdateEmailUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: ClientRepository,
  ) {}

  async execute(id: string, email: string): Promise<ClientResponseDto> {
    const client = await this.clientRepository.getById(id);

    if (!client) throw new ClientNotFoundError(id);
    client.updateEmail(new EmailVO(email));
    Logger.log('Email-updated');

    return ClientMapper.toDTO(client);
  }
}
