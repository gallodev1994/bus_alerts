import { ClientResponseDto } from '@/presentation/client/dto/client-response.dto';
import { CreateClientDTO } from '@/presentation/client/dto/create.client.dto';
import { CreateClienteUseCase } from '../create-client.use-case';
import { ClientWriteRepository } from '@/domain/repositories/client.repository';
import { Client } from '@/domain/entities/client.entity';
import { error } from 'console';

describe('create client usecase', () => {
  const throwingRepositoryStub: ClientWriteRepository = {
    save: function (client: Client): Promise<Client> {
      throw new Error('Function not implemented.');
    },
  };

  const repositoryMock: ClientWriteRepository = {
    save: function (client: Client): Promise<Client> {
      return new Promise((resolve) => {
        resolve(client);
      });
    },
  };
  it('Should create a new client with stub', async () => {
    const useCase = new CreateClienteUseCase(throwingRepositoryStub);

    const client: CreateClientDTO = {
      email: 'contato.gallodev@gmail.com',
      name: 'Christian',
    };

    await expect(useCase.execute(client)).rejects.toThrow();
  });

  it('Should save a new client', async () => {
    const useCase = new CreateClienteUseCase(repositoryMock);

    const client: CreateClientDTO = {
      email: 'contato.gallodev@gmail.com',
      name: 'Christian',
    };

    const result = await useCase.execute(client);
    expect(result.email).toBe('contato.gallodev@gmail.com');
    expect(result.name).toBe('Christian');
    expect(result.fetchDateTime).toBeInstanceOf(Date);
  });
});
