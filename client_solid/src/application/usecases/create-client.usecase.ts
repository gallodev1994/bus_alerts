import { Inject, Logger } from '@nestjs/common';
import { CLIENT_REPOSITORY } from '@/shared/tokens/client.repository.token';
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
    const client = Client.createClient({
      name: createClientDto.name,
      email: new EmailVO(createClientDto.email),
    });

    const savedClient = await this.clientRepository.save(client);

    Logger.debug(savedClient);

    return ClientMapper.toDTO(savedClient);
  }
}
