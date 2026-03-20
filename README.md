# Event drive design

🧾 Task: Sistema de Notificações Orientado a Eventos
📌 Contexto

      Estamos evoluindo nossa plataforma para uma arquitetura mais escalável e desacoplada.
      Atualmente, ações como criação de usuários estão fortemente acopladas a processos secundários (ex: envio de email, analytics).

      Precisamos introduzir um modelo orientado a eventos para permitir crescimento sustentável da plataforma.

🧪 Critérios de Aceite

      Usuário é criado com sucesso via API

      Evento UserCreated é publicado após criação

      Dois consumers reagem ao evento corretamente

      Falhas em consumers não impactam a criação do usuário

      Código organizado em camadas bem definidas

      Testes automatizados cobrindo:

      Use case de criação

      Publicação de evento

      Execução dos consumers

📦 Entregáveis

      Repositório Git público

      README contendo:

      Explicação da arquitetura

      Decisões técnicas

      Como rodar o projeto

      Diagrama simples da arquitetura (opcional, mas recomendado)

🤓 - Done

1. [x] github public repo
2. [x] project boirplate
3. [x] application splited in layers
4. [x] validate e-mail with valid-objects
5. [x] increase domain rules

- Todo

1.  [ ] Test Coverage
2.  [ ] Implement infrastructure database
3.  [ ] Readme
4.  [ ] Architeture explanation
5.  [ ] Techniques decisions
6.  [ ] Architeture diagram
7.  [ ] Implement event driven design
8.  [ ] Implement rabitmq to qeue events

Tests - I don't use TDD because i learn SOLID pattern , before i will implement

````
   curl  --json '{"name": "christian", "email": "contato.gallodev@gmail.com"}' http://localhost:3000/clients
   curl  http://localhost:3000/clients 
   curl -X PATCH http://localhost:3000/clients/change-email/1 --json '{"name": "christian", "email": "contato.gallodev@gmail.com"}'    
   
   ```
````
