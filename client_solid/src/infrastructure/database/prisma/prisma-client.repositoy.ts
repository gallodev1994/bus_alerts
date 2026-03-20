import { Client } from '@/domain/entities/client.entity';
import type { ClientRepository } from '@/domain/repositories/client.repository';
import { EmailVO } from '@/domain/value-objects/email.vo';

export class PrismaClientRepository implements ClientRepository {
  save(client: Client): Promise<Client> {
    const res = {
      email: client.email,
      name: client.name,
    };

    return new Promise((resolve) => {
      resolve(new Client(res.name, res.email));
    });
  }
  list(): Promise<Client[]> {
    return new Promise((resolve) => {
      resolve(new Array(new Client('xx', new EmailVO('a'))));
    });
  }
  getById(id: string): Promise<Client | null> {
    return new Promise((resolve) => {
      resolve(new Client(id, new EmailVO('a')));
    });
  }
}
