import { ClientRules } from '../enums/client.rules';

type ClientActionsProps = {
  readonly rule: ClientRules;
};

export class ClientActions {
  private props: ClientActionsProps;

  constructor(props: ClientActionsProps) {
    this.props = props;
  }

  getAllowedMethods() {
    switch (this.props.rule) {
      case ClientRules.ADMIN:
        return ['READ', 'WRITE', 'UPDATE', 'DELETE', 'REMOVE_USER'];
      case ClientRules.MANAGER:
        return ['READ', 'WRITE', 'UPDATE', 'DELETE'];
      case ClientRules.USER:
        return ['READ', 'WRITE', 'UPDATE'];
      case ClientRules.READONLY:
        return ['READ'];
    }
  }
}
