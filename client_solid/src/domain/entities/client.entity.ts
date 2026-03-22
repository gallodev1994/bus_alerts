import { EmailVO } from '../value-objects/email.vo';
import { ClientRules } from '../enums/client.rules';
import { ClientActions } from './client.actions';
import { ClientEmailPolicy } from './client-email.policy';
import { randomUUID, UUID } from 'crypto';
import { PermissionError } from '../errors/index';

type ClientProps = {
  readonly name: string;
  email: EmailVO;
};

export class Client {
  private id: UUID = randomUUID();
  private props: ClientProps;
  private active = true;
  private enablePerformAction: boolean = true;
  private clientRule: number = ClientRules.USER;

  private constructor(props: ClientProps) {
    this.props = props;
    this.validate();
  }

  private validate() {
    this.checkIsAdmin();
  }

  private checkIsAdmin() {    
    if (this.props.email.value.includes('@admin.com')) {
      this.clientRule = ClientRules.ADMIN;
    }
  }

  static createClient(props: ClientProps) {
    if (!props.name) throw new Error('Name required');
    return new Client(props);
  }

  get email() {
    return this.props.email;
  }

  get name() {
    return this.props.name;
  }

  get isActive() {
    return this.active;
  }

  get clientId() {
    return this.id;
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

  updateEmail(email: string) {
    if (!ClientEmailPolicy.canUpdate(this.clientRule)) {
      throw new PermissionError();
    }
    this.props.email = EmailVO.create(email);
  }

  getActions() {
    if (this.enablePerformAction)
      return new ClientActions({ rule: this.clientRule }).getAllowedMethods();
  }
}
