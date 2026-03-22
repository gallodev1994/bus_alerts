export class PermissionError extends Error {
  constructor() {
    super();
    this.message = 'Client not allowed to do this.';
    this.name = 'ClientPermissionError';
  }
}

export class ClientNotFoundError extends Error {
  constructor(id: string) {
    super();
    this.message = `Client with id ${id} not found`;
    this.name = 'ClientNotFoundError';
  }
}

export class ClientByEmailNotFoundError extends Error {
  constructor(email: string) {
    super();
    this.message = `Client with email ${email} not found`;
    this.name = 'ClientNotFoundError';
  }
}

export class InvalidEmail extends Error {
  constructor() {
    super();
    this.message = 'Email format is invalid';
    this.name = 'InvalidEmail';
  }
}
