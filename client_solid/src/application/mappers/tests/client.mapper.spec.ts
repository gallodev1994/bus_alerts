import { EmailVO } from '@/domain/value-objects/email.vo';
import { ClientMapper } from '../client.mapper';
import { Client } from '@/domain/entities/client.entity';

describe('Client mapper test', () => {
  it('Map Client to DTO', () => {
    const client = Client.createClient({
      email: EmailVO.create('contato.gallodev@gmail.com'),
      name: 'Christian',
    });

    const mapper = ClientMapper.toDTO(client);

    expect(mapper).toHaveProperty('email');
    expect(mapper).toHaveProperty('name');
    expect(mapper).toHaveProperty('fetchDateTime');
    expect(mapper.email).toBe('contato.gallodev@gmail.com');
    expect(mapper.name).toBe('Christian');
  });

  it('Map CLient to DTO list', () => {
    const clients = [
      Client.createClient({
        email: EmailVO.create('contato.gallodev@gmail.com'),
        name: 'Christian',
      }),
      Client.createClient({
        email: EmailVO.create('contato.gallodev2@gmail.com'),
        name: 'Christian2',
      }),
    ];

    const mapper = ClientMapper.toDTOList(clients);

    expect(Array.isArray(mapper)).toBe(true);
    expect(mapper[0]).toHaveProperty('fetchDateTime');
    expect(mapper[0]).toHaveProperty('name');
    expect(mapper[0]).toHaveProperty('email');
    expect(mapper[0].email).toBe('contato.gallodev@gmail.com');
    expect(mapper[0].name).toBe('Christian');
    expect(mapper[1].email).toBe('contato.gallodev2@gmail.com');
    expect(mapper[1].name).toBe('Christian2');
  });

  it('Map to Domain', () => {
    const mapper = ClientMapper.toDomain({
      name: 'Christian',
      email: 'contato.gallodev@gmail.com',
    });

    expect(mapper).toHaveProperty('name');
    expect(mapper).toHaveProperty('email');
    expect(mapper.name).toBe('Christian');
    expect(mapper.email.value).toBe('contato.gallodev@gmail.com');
    expect(mapper.isActive).toBe(true);
    expect(mapper.clientId).toHaveLength;
  });
});
