export class ClientNotFoundError extends Error {
  constructor(id: string) {
    super(`Client with id ${id} not found`);
  }
}
