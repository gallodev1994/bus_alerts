import { Module } from '@nestjs/common';
import { ClientController } from '@/presentation/client/client.controller';

import { CLIENT_REPOSITORY } from '@/shared/tokens/client.repository.token';
import { CreateClienteUseCase } from '@/application/usecases/create-client.use-case';
import { PrismaClientRepository } from '@/infrastructure/database/prisma/prisma-client.repositoy';
import { GetClientsUseCase } from '@/application/usecases/get-clients.use-case';
import { GetClientByIdUseCase } from '@/application/usecases/get-client-by-id.use-case';
import { UpdateEmailUseCase } from './application/usecases/update-email.use-case';

@Module({
  imports: [],
  controllers: [ClientController],
  providers: [
    CreateClienteUseCase,
    GetClientsUseCase,
    GetClientByIdUseCase,
    UpdateEmailUseCase,
    {
      useClass: PrismaClientRepository,
      provide: CLIENT_REPOSITORY,
    },
  ],
})
export class AppModule {}
