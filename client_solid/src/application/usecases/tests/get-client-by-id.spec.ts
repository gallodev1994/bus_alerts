import { Client } from '@/domain/entities/client.entity';
import { GetClientByIdUseCase } from '../get-client-by-id.use-case';
import { ClientReadRepository } from '@/domain/repositories/client.repository';
import { EmailVO } from '@/domain/value-objects/email.vo';
import { ClientNotFoundError } from '@/domain/errors';

describe('get client by id usecase', () => {
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
      throw new Error('Function not implemented.');
    },
    getById: function (id: string): Promise<Client | null> {
      const client = Client.createClient({
        email: EmailVO.create('t@gmail.com'),
        name: 't',
      });
      return new Promise((resolve) => {
        if (id == '99') {
          resolve(null);
        }
        resolve(client);
      });
    },
    getByEmail: function (email: string): Promise<Client | null> {
      throw new Error('Function not implemented.');
    },
  };

  it('Should list clients with stub', async () => {
    const id = '1';
    const usecase = new GetClientByIdUseCase(throwingRepositoryStub);

    await expect(usecase.execute(id)).rejects.toThrow();
  });
  it('Should get client by id', async () => {
    const id = '2';
    const usecase = new GetClientByIdUseCase(repositoryMock);
    const client = await usecase.execute(id);

    expect(client.email).toBe('t@gmail.com');
    expect(client.name).toBe('t');
    expect(client.fetchDateTime).toBeInstanceOf(Date);
  });

  it('Should get non-existent client by id ', async () => {
    const id = '99';
    const usecase = new GetClientByIdUseCase(repositoryMock);

    await expect(usecase.execute(id)).rejects.toThrow(
      new ClientNotFoundError(id),
    );
  });
});
