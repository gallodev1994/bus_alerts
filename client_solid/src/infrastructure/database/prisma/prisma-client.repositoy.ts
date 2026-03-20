import { Client } from '@/domain/entities/client.entity';
import type { ClientRepository } from '@/domain/repositories/client.repository';
import { EmailVO } from '@/domain/value-objects/email.vo';

export class PrismaClientRepository implements ClientRepository {
  save(client: Client): Promise<Client> {
    const mock_response: Client = new Client({
      email: client.email,
      name: client.name,
    });

    return new Promise((resolve) => {
      resolve(mock_response);
    });
  }
  async list(): Promise<Client[]> {
    return Array.from(
      { length: 5 },
      () =>
        new Client({
          email: new EmailVO('teste@teste.com'),
          name: 'teste',
        }),
    );
  }
  getById(id: string): Promise<Client | null> {
    return new Promise((resolve) => {
      resolve(
        new Client({
          email: new EmailVO('teste2@admin.com'),
          name: 'teste',
        }),
      );
    });
  }
}
