import { Client } from '@/domain/entities/client.entity';

export interface ClientRepository {
  save(client: Client): Promise<Client>;
  list(): Promise<Client[]>;
  getById(id: string): Promise<Client | null>;
}
