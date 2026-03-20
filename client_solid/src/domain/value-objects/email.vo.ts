export class EmailVO {
  constructor(public readonly value: string) {
    if (!value) throw new Error('Email is required to create client');
    this.validate();
  }

  private validate() {
    if (!this.value.includes('@')) {
      throw new Error('Invalid e-mail');
    }
  }
}
