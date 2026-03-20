import { ClientRules } from '../enums/client.rules';

export class ClientEmailPolicy {
  static canUpdate(rule: ClientRules): boolean {
    return [ClientRules.ADMIN, ClientRules.MANAGER].includes(rule);
  }
}
