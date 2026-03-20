import { Inject, Logger } from '@nestjs/common';
import { CLIENT_REPOSITORY } from '@/application/tokens/client.repository.token';
import type { ClientRepository } from '@/domain/repositories/client.repository';
import type { CreateClientDTO } from '@/presentation/client/dto/create.client.dto';
import type { ClientResponseDto } from '@/presentation/client/dto/client-response.dto';
import { Client } from '@/domain/entities/client.entity';
import { EmailVO } from '@/domain/value-objects/email.vo';
import { ClientMapper } from '../mappers/client.mapper';

export class CreateClienteUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: ClientRepository,
  ) {}

  async execute(createClientDto: CreateClientDTO): Promise<ClientResponseDto> {
    const client = new Client(
      createClientDto.name,
      new EmailVO(createClientDto.email),
    );

    const savedClient = await this.clientRepository.save(client);

    if (savedClient.email.equals(new EmailVO('admin@admin.com'))) {
      Logger.warn('SOMEONE TRY TO ENTER WITH ADMIN EMAIL!');
    }

    return ClientMapper.toDTO(client);
  }
}
