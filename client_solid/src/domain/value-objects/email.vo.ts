import { InvalidEmail } from '../errors';

export class EmailVO {
  public readonly value;

  private constructor(email: string) {
    this.value = email;
  }

  static create(email: string) {
    const normalizeEmail = email.toLowerCase().trim();
    if (!this.validate(normalizeEmail)) {
      throw new InvalidEmail();
    }
    return new EmailVO(normalizeEmail);
  }

  private static validate(email: string): boolean {
    return email.includes('@');
  }
}
