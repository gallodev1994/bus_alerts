import { Client } from '@/domain/entities/client.entity';
import { GetClientsUseCase } from '../get-clients.use-case';
import { ClientReadRepository } from '@/domain/repositories/client.repository';
import { EmailVO } from '@/domain/value-objects/email.vo';

describe('get client usecase', () => {
  const throwingRepositoryStub: ClientReadRepository = {
    list: function (): Promise<Client[]> {
      throw new Error('Function not implemented.');
    },
    getById: function (id: string): Promise<Client | null> {
      throw new Error('Function not implemented.');
    },
    getByEmail: function (email: string): Promise<Client | null> {
      throw new Error('Function not implemented.');
    },
  };

  const repositoryMock: ClientReadRepository = {
    list: function (): Promise<Client[]> {
      const clients: Client[] = [
        Client.createClient({
          email: EmailVO.create('t@gmail.com'),
          name: 't',
        }),
        Client.createClient({
          email: EmailVO.create('t2@gmail.com'),
          name: 't2',
        }),
      ];
      return new Promise((resolve) => {
        resolve(clients);
      });
    },
    getById: function (id: string): Promise<Client | null> {
      throw new Error('Function not implemented.');
    },
    getByEmail: function (email: string): Promise<Client | null> {
      throw new Error('Function not implemented.');
    },
  };

  it('Should list clients with stub', async () => {
    const usecase = new GetClientsUseCase(throwingRepositoryStub);

    await expect(usecase.execute()).rejects.toThrow();
  });
  it('Should get all clients', async () => {
    const usecase = new GetClientsUseCase(repositoryMock);
    const clients = await usecase.execute();

    expect(clients[0].email).toBe('t@gmail.com');
    expect(clients[0].name).toBe('t');
    expect(clients[1].email).toBe('t2@gmail.com');
    expect(clients[1].name).toBe('t2');
    expect(clients[0].fetchDateTime).toBeInstanceOf(Date);
    expect(clients[1].fetchDateTime).toBeInstanceOf(Date);
  });
});
