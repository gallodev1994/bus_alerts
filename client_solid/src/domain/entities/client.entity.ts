import { EmailVO } from '@/domain/value-objects/email.vo';

export class Client {
  public readonly name: string;
  public readonly email: EmailVO;

  constructor(name: string, email: EmailVO) {
    this.name = name;
    this.email = email;
  }
}
