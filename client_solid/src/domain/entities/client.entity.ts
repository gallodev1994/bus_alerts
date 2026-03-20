import { EmailVO } from '../value-objects/email.vo';

export class Client {
  constructor(
    public readonly name: string,
    public readonly email: EmailVO,
  ) {
    this.validate();
  }

  private validate() {
    if (!this.name) throw new Error('Name required');
  }
}
