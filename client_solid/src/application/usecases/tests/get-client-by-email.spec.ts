import { Client } from '@/domain/entities/client.entity';
import { GetClientByEmailUseCase } from '../get-client-by-email.use-case';
import { ClientReadRepository } from '@/domain/repositories/client.repository';
import { EmailVO } from '@/domain/value-objects/email.vo';
import { ClientByEmailNotFoundError, ClientNotFoundError } from '@/domain/errors';

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
     }
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
     }
  };

  it('Should list clients with stub', async () => {
    const email = 't@gmail.com';
    const usecase = new GetClientByEmailUseCase(throwingRepositoryStub);

    await expect(usecase.execute(email)).rejects.toThrow();
  });
  it('Should get client by email', async () => {
    const email = 't@gmail.com';
    const usecase = new GetClientByEmailUseCase(repositoryMock);
    const client = await usecase.execute(email);

    expect(client.email).toBe('t@gmail.com');
    expect(client.name).toBe('t');
    expect(client.fetchDateTime).toBeInstanceOf(Date);
  });

  it('Should get non-existent client by id ', async () => {
    const email = 'x@gmail.com';
    const usecase = new GetClientByEmailUseCase(repositoryMock);

    await expect(usecase.execute(email)).rejects.toThrow(
      new ClientByEmailNotFoundError(email),
    );
  });
});
