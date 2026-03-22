# Strategy Pattern & Configuration-Based Approach

## Problema Atual

```typescript
// ❌ Hardcoded - difícil de estender e modificar
export class ClientEmailPolicy {
  static canUpdate(rule: ClientRules): boolean {
    return [ClientRules.ADMIN, ClientRules.MANAGER].includes(rule);
  }
}
```

---

## 1. Strategy Pattern

### Estrutura

```
src/
├── domain/
│   ├── policies/
│   │   ├── email-update.policy.ts           # Interface comum
│   │   ├── strategies/
│   │   │   ├── admin-email.strategy.ts
│   │   │   ├── manager-email.strategy.ts
│   │   │   └── user-email.strategy.ts
│   │   └── email-policy-factory.ts          # Factory
│   └── entities/
│       └── client.entity.ts
```

### Implementação

```typescript
// domain/policies/email-update.policy.ts
export interface EmailUpdateStrategy {
  canUpdate(): boolean;
  getPriority(): number;
}
```

```typescript
// domain/policies/strategies/admin-email.strategy.ts
import { EmailUpdateStrategy } from '../email-update.policy';
import { ClientRules } from '../../enums/client.rules';

export class AdminEmailStrategy implements EmailUpdateStrategy {
  constructor(private readonly rule: ClientRules) {}

  canUpdate(): boolean {
    return this.rule === ClientRules.ADMIN;
  }

  getPriority(): number {
    return 100;
  }
}
```

```typescript
// domain/policies/strategies/manager-email.strategy.ts
import { EmailUpdateStrategy } from '../email-update.policy';
import { ClientRules } from '../../enums/client.rules';

export class ManagerEmailStrategy implements EmailUpdateStrategy {
  constructor(private readonly rule: ClientRules) {}

  canUpdate(): boolean {
    return this.rule === ClientRules.MANAGER;
  }

  getPriority(): number {
    return 90;
  }
}
```

```typescript
// domain/policies/strategies/user-email.strategy.ts
import { EmailUpdateStrategy } from '../email-update.policy';
import { ClientRules } from '../../enums/client.rules';

export class UserEmailStrategy implements EmailUpdateStrategy {
  constructor(private readonly rule: ClientRules) {}

  canUpdate(): boolean {
    return this.rule === ClientRules.USER;
  }

  getPriority(): number {
    return 50;
  }
}
```

```typescript
// domain/policies/email-policy-factory.ts
import { EmailUpdateStrategy } from './email-update.policy';
import { ClientRules } from '../enums/client.rules';
import { AdminEmailStrategy } from './strategies/admin-email.strategy';
import { ManagerEmailStrategy } from './strategies/manager-email.strategy';
import { UserEmailStrategy } from './strategies/user-email.strategy';

export class EmailPolicyFactory {
  private static strategies: Map<ClientRules, EmailUpdateStrategy> = new Map([
    [ClientRules.ADMIN, new AdminEmailStrategy(ClientRules.ADMIN)],
    [ClientRules.MANAGER, new ManagerEmailStrategy(ClientRules.MANAGER)],
    [ClientRules.USER, new UserEmailStrategy(ClientRules.USER)],
  ]);

  static create(rule: ClientRules): EmailUpdateStrategy {
    const strategy = this.strategies.get(rule);
    if (!strategy) {
      throw new Error(`Strategy not found for rule: ${rule}`);
    }
    return strategy;
  }

  static register(rule: ClientRules, strategy: EmailUpdateStrategy): void {
    this.strategies.set(rule, strategy);
  }
}
```

```typescript
// domain/policies/client-email.policy.ts (simplificado)
import { ClientRules } from '../enums/client.rules';
import { EmailPolicyFactory } from './email-policy-factory';

export class ClientEmailPolicy {
  static canUpdate(rule: ClientRules): boolean {
    const strategy = EmailPolicyFactory.create(rule);
    return strategy.canUpdate();
  }
}
```

**Uso no Entity:**

```typescript
// domain/entities/client.entity.ts
import { ClientEmailPolicy } from '../policies/client-email.policy';

updateEmail(email: string) {
  if (!ClientEmailPolicy.canUpdate(this.clientRule)) {
    throw new PermissionError();
  }
  this.props.email = new EmailVO(email);
}
```

---

## 2. Configuration-Based Approach

### Estrutura

```
src/
├── config/
│   └── policies.config.ts
├── domain/
│   ├── policies/
│   │   └── client-email.policy.ts
│   └── enums/
│       └── permissions.config.ts
```

### Implementação

```typescript
// config/policies.config.ts
export const EmailUpdatePermissions = {
  allowedRoles: ['ADMIN', 'MANAGER'],
  
  canUpdate(role: string): boolean {
    return this.allowedRoles.includes(role);
  },
} as const;

export const PermissionsConfig = {
  emailUpdate: EmailUpdatePermissions,
  
  getRolePermissions(role: string) {
    return {
      canUpdateEmail: this.emailUpdate.canUpdate(role),
    };
  },
} as const;
```

```typescript
// domain/enums/permissions.config.ts
export enum ClientPermissions {
  UPDATE_EMAIL = 'UPDATE_EMAIL',
  DELETE_CLIENT = 'DELETE_CLIENT',
  READ_CLIENT = 'READ_CLIENT',
}

export const RolePermissions: Record<ClientRules, ClientPermissions[]> = {
  [ClientRules.ADMIN]: [
    ClientPermissions.UPDATE_EMAIL,
    ClientPermissions.DELETE_CLIENT,
    ClientPermissions.READ_CLIENT,
  ],
  [ClientRules.MANAGER]: [
    ClientPermissions.UPDATE_EMAIL,
    ClientPermissions.READ_CLIENT,
  ],
  [ClientRules.USER]: [
    ClientPermissions.READ_CLIENT,
  ],
  [ClientRules.READONLY]: [
    ClientPermissions.READ_CLIENT,
  ],
};
```

```typescript
// domain/policies/client-email.policy.ts
import { ClientRules } from '../enums/client.rules';
import { RolePermissions, ClientPermissions } from '../enums/permissions.config';

export class ClientEmailPolicy {
  static canUpdate(role: ClientRules): boolean {
    return RolePermissions[role].includes(ClientPermissions.UPDATE_EMAIL);
  }
}
```

---

## 3. Approach Híbrida (Strategy + Config)

### Estrutura

```
src/
├── config/
│   └── permissions.config.ts
├── domain/
│   ├── policies/
│   │   ├── base/
│   │   │   └── base-strategy.ts
│   │   ├── concrete/
│   │   │   ├── admin-strategy.ts
│   │   │   └── manager-strategy.ts
│   │   ├── email-update.policy.ts
│   │   └── strategy-factory.ts
```

### Implementação

```typescript
// config/permissions.config.ts
export const EmailUpdateConfig = {
  allowedRoles: ['ADMIN', 'MANAGER'],
  
  isRoleAllowed(role: string): boolean {
    return this.allowedRoles.includes(role);
  },
} as const;
```

```typescript
// domain/policies/base/base-strategy.ts
export interface BaseStrategy<T = any> {
  supports(context: T): boolean;
  execute(): boolean;
}
```

```typescript
// domain/policies/concrete/admin-strategy.ts
import { BaseStrategy } from '../base/base-strategy';
import { ClientRules } from '../../enums/client.rules';
import { EmailUpdateConfig } from '../../../config/permissions.config';

export class AdminEmailStrategy implements BaseStrategy<ClientRules> {
  constructor(private readonly role: ClientRules) {}

  supports(context: ClientRules): boolean {
    return context === ClientRules.ADMIN;
  }

  execute(): boolean {
    return EmailUpdateConfig.isRoleAllowed('ADMIN');
  }
}
```

```typescript
// domain/policies/concrete/manager-strategy.ts
import { BaseStrategy } from '../base/base-strategy';
import { ClientRules } from '../../enums/client.rules';
import { EmailUpdateConfig } from '../../../config/permissions.config';

export class ManagerEmailStrategy implements BaseStrategy<ClientRules> {
  constructor(private readonly role: ClientRules) {}

  supports(context: ClientRules): boolean {
    return context === ClientRules.MANAGER;
  }

  execute(): boolean {
    return EmailUpdateConfig.isRoleAllowed('MANAGER');
  }
}
```

```typescript
// domain/policies/strategy-factory.ts
import { BaseStrategy } from './base/base-strategy';
import { ClientRules } from '../enums/client.rules';
import { AdminEmailStrategy } from './concrete/admin-strategy';
import { ManagerEmailStrategy } from './concrete/manager-strategy';

export class StrategyFactory {
  private static strategies: BaseStrategy<ClientRules>[] = [
    new AdminEmailStrategy(ClientRules.ADMIN),
    new ManagerEmailStrategy(ClientRules.MANAGER),
  ];

  static resolve(role: ClientRules): BaseStrategy<ClientRules> | null {
    return this.strategies.find((s) => s.supports(role)) ?? null;
  }

  static register(strategy: BaseStrategy<ClientRules>): void {
    this.strategies.push(strategy);
  }
}
```

```typescript
// domain/policies/email-update.policy.ts
import { ClientRules } from '../enums/client.rules';
import { StrategyFactory } from './strategy-factory';

export class ClientEmailPolicy {
  static canUpdate(role: ClientRules): boolean {
    const strategy = StrategyFactory.resolve(role);
    return strategy?.execute() ?? false;
  }
}
```

---

## Comparação

| Aspecto | Strategy Pattern | Config-Based | Híbrido |
|---------|-----------------|--------------|---------|
| **Extensibilidade** | ⭐⭐⭐⭐⭐ Adicionar nova strategy | ⭐⭐⭐ Editar config | ⭐⭐⭐⭐⭐ Ambos |
| **Manutenção** | ⭐⭐⭐⭐ Cada strategy isolada | ⭐⭐⭐⭐⭐ Uma config | ⭐⭐⭐⭐ |
| **Testabilidade** | ⭐⭐⭐⭐⭐ Unit tests por strategy | ⭐⭐⭐⭐⭐ Testar config | ⭐⭐⭐⭐⭐ |
| **Complexidade** | ⭐⭐⭐ Médio | ⭐⭐ Simples | ⭐⭐⭐⭐ Mais código |
| **Flexibilidade Runtime** | ⭐⭐⭐⭐ Possível | ⭐⭐⭐ Arquivo externo | ⭐⭐⭐⭐⭐ Ambos |

---

## Recomendação

**Para este caso específico**, a **Configuration-Based Approach** é suficiente e mais simples:

```typescript
// domain/policies/client-email.policy.ts
import { ClientRules } from '../enums/client.rules';
import { RolePermissions, ClientPermissions } from '../enums/permissions.config';

export class ClientEmailPolicy {
  static readonly ALLOWED_ROLES = [ClientRules.ADMIN, ClientRules.MANAGER];

  static canUpdate(role: ClientRules): boolean {
    return this.ALLOWED_ROLES.includes(role);
  }
}
```

**Se precisar de lógica mais complexa** (ex: validação condicional, logging, side-effects), use **Strategy Pattern**.

**Se quiser o melhor dos dois mundos**, use a abordagem **Híbrida** com configuração externalizável para arquivos JSON/env.
