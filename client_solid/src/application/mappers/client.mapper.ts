import { Client } from '@/domain/entities/client.entity';
import { ClientResponseDto } from '@/presentation/client/dto/client-response.dto';

export class ClientMapper {
  static toDTO(client: Client): ClientResponseDto {
    return {
      email: client.email.value,
      name: client.name,
      fetchDateTime: new Date(),
    };
  }

  static toDTOList(clients: Client[]): ClientResponseDto[] {
    const now = new Date();

    return clients.map((client) => ({
      email: client.email.value,
      name: client.name,
      fetchDateTime: now,
    }));
  }
}
