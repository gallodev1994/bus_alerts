export class EmailVO {
  constructor(public readonly value: string) {
    if (!this.value.includes('@')) throw new Error('Invalid e-mail');
  }
}
