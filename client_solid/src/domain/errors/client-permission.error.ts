export class PermissionError extends Error {
  constructor() {
    super();
    this.name = 'ClientPermissionError'
    this.message = 'Client not allowed to do this.';
  }
}
