import { Module } from '@nestjs/common';
import { ClientController } from '@/presentation/client/client.controller';

import { CLIENT_REPOSITORY } from '@/shared/tokens/client.repository.token';
import { CreateClienteUseCase } from '@/application/usecases/create-client.usecase';
import { PrismaClientRepository } from '@/infrastructure/database/prisma/prisma-client.repositoy';
import { GetClientUseCase } from '@/application/usecases/get-client.usecase';

@Module({
  imports: [],
  controllers: [ClientController],
  providers: [
    CreateClienteUseCase,
    GetClientUseCase,
    {
      useClass: PrismaClientRepository,
      provide: CLIENT_REPOSITORY,
    },
  ],
})
export class AppModule {}
