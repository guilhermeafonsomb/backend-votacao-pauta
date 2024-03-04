<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.


## Orientações

O projeto já vem com dois usuários no banco de dados para realizar a troca e assim testar o sistema de votação.

O link da documentação swagger estara dando display no terminal assim que rodar a aplicação com sucesso.

## Para instalar as Dependências

```bash
$ npm install
```

A porta da aplicação  `http://localhost:3000/` por padrão.

A porta do swagger  `http://localhost:3000/api#/` por padrão.


## Para rodar o projeto

```bash
$ npm run start
```

## Para rodar os testes

```bash
# unit tests
$ npm run test
```

## Tecnologias usadas

- NestJs
- TypeScript
- Swagger
- PrismaJs
- SQLite

  

## Explicações

Optei pelo NestJS para o projeto backend devido à sua arquitetura bem estruturada, que facilita a manutenção e escalabilidade do código. A integração nativa com TypeScript promove um desenvolvimento mais seguro e eficiente. A vasta biblioteca de módulos integráveis e a comunidade ativa tornam o NestJS uma escolha robusta para construir aplicações modernas e testáveis.


Escolhi por utilizar o Prisma em meu projeto devido à sua facilidade de uso e abstração poderosa sobre o banco de dados, permitindo realizar consultas complexas de forma simples e segura. Sua integração perfeita com TypeScript oferece autocompletar e verificação de tipo em tempo de desenvolvimento, reduzindo erros e melhorando a qualidade do código. Além disso, o Prisma simplifica o processo de migração de banco de dados e gera automaticamente um cliente de banco de dados que se adapta ao esquema definido, agilizando o desenvolvimento e facilitando a manutenção do projeto.

Decidi pelo SQLite devido à sua simplicidade, leveza e configuração zero, o que o torna ideal para desenvolvimento rápido e aplicações menores, diferentemente do PostgreSQL e MongoDB que são mais adequados para aplicações de maior escala e complexidade.Utilizei o SQLite, apesar de ter experiencia com MongDB e Postgress pois julguei uma aplicação simples e para isso esse banco de dados já era o suficiente para atinger as metas propostas.

Priorizei por organizar o projeto em módulos com pastas separadas para repository, service e controller para cada módulo, visando melhorar a organização do código e facilitar a manutenção. Essa estrutura modular permite a separação clara de responsabilidades, tornando o código mais limpo, escalável e fácil de entender. Além disso, facilita a reutilização de código e a implementação de testes, contribuindo para um desenvolvimento mais eficiente e uma base de código mais robusta.
