import { Client } from '@/domain/entities/client.entity';
import type {
  ClientReadRepository,
  ClientWriteRepository,
} from '@/domain/repositories/client.repository';
import { EmailVO } from '@/domain/value-objects/email.vo';
import { ClientMapper } from '@/application/mappers/client.mapper';

export class PrismaClientRepository
  implements ClientReadRepository, ClientWriteRepository
{
  async save(client: Client): Promise<Client> {
    const mock_response: Client = Client.createClient({
      email: client.email,
      name: client.name,
    });

    return mock_response;
  }
  async list(): Promise<Client[]> {
    return Array.from({ length: 5 }, () =>
      Client.createClient({
        email: new EmailVO('teste@teste.com'),
        name: 'teste',
      }),
    );
  }
  async getById(id: string): Promise<Client | null> {
    return ClientMapper.toDomain({
      email: new EmailVO('teste2@adminx.com'),
      name: 'teste',
    });
  }
}
