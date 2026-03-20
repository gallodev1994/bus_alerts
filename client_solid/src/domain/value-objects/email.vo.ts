export class EmailVO {
  constructor(public readonly value: string) {
    if (!/\S+@\S+\.\S+/.test(value)) {
      throw new Error('Invalid email');
    }
  }

  equals(other: EmailVO): boolean {
    return this.value === other.value;
  }
}
