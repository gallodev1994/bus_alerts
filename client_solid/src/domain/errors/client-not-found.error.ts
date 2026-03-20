export class ClientNotFoundError extends Error {
  constructor(id: string) {
    super();
    this.message = `Client with id ${id} not found`;
    this.name = 'ClientNotFoundError';
  }
}
