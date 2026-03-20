import { EmailVO } from '../value-objects/email.vo';
import { ClientRules } from '../enums/client.rules';
import { ClientActions } from './client.actions';

type ClientProps = {
  readonly name: string;
  email: EmailVO;
};

export class Client {
  private props: ClientProps;
  private active = true;
  private admin = false;
  private enablePerformAction: boolean = true;
  private clientRule: number = ClientRules.USER;

  constructor(props: ClientProps) {
    this.props = props;
    this.validate();
  }

  private validate() {
    if (!this.props.name) throw new Error('Name required');
    if (!this.props.email.value.includes('@'))
      throw new Error('Invalid e-mail format');
    this.checkIsAdmin();
  }

  private checkIsAdmin() {
    if (this.props.email.value.includes('@admin.com')) {
      this.admin = true;
    }
  }

  static createUser(props: ClientProps) {
    return new Client(props);
  }

  get email() {
    return this.props.email;
  }

  get name() {
    return this.props.name;
  }

  get isAdmin() {
    return this.admin;
  }

  get isActive() {
    return this.active;
  }

  get isEnablePerformAction() {
    return this.enablePerformAction;
  }

  activate() {
    this.active = true;
    this.enablePerformAction = true;
  }

  desactive() {
    this.active = false;
    this.enablePerformAction = false;
  }

  setRule(rule: ClientRules) {
    this.clientRule = rule;
  }

  updateEmail(email: EmailVO) {
    const enabled_to = [ClientRules.MANAGER, ClientRules.ADMIN];
    if (!enabled_to.includes(this.clientRule)) {
      throw new Error("The client don't have a rule to update email");
    }
    this.props.email = email;
  }

  getActions() {
    return new ClientActions({ rule: this.clientRule }).getAllowedMethods();
  }
}
