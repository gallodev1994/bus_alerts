export class EmailVO {
  constructor(public readonly value: string) {
    this.validate();
  }

  private validate() {
    if (!this.value.includes('@')) {
      throw new Error('Invalid e-mail');
    }
  }
}
