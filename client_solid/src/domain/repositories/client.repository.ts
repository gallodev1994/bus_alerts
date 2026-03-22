import { Client } from '@/domain/entities/client.entity';

export interface ClientWriteRepository {
  save(client: Client): Promise<Client>;
}

export interface ClientReadRepository {
  list(): Promise<Client[]>;
  getById(id: string): Promise<Client | null>;
  getByEmail(email: string): Promise<Client | null>;
}
