import { Client } from '@/domain/entities/client.entity';

export interface ClientRepository {
  save(payload: Client): Promise<Client>;
  list(): Promise<Client[]>;
  getById(id: string): Promise<Client | null>;
}
