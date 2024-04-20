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

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

# IIC2173 Arquitectura de Sistemas de Software: E1

## Instrucciones para Ejecutar Localmente

Para ejecutar localmente el proyecto, se debe tener sistema operativo Linux o MacOS, con Node.js y Postgresql instalados. Luego, se debe clonar el repositorio del proyecto y abrir una consola en el directorio de la API y otra en el directorio del Broker. En cada consola se debe ejecutar el comando `npm install` para actualizar las dependencias de cada una de las partes del proyecto. En el directorio de la API, se debe crear un archivo `.env` con las siguientes variables de entorno:

```
DATABASE_USER={user}
DATABASE_PASSWORD={password}
DATABASE_PORT=5432
DATABASE_NAME={db_name}
DATABASE_HOST=localhost
```

donde `{user}` y `{password}` son las credenciales de acceso a la base de datos, y `{db_name}` es el nombre de la base de datos. A continuación, se debe crear un usuario de postgres con el nombre de usuario y contraseña especificados, el cual a su vez debe tener una base de datos creada con el nombre especificado en el archivo `.env`.
Para ejecutar el proyecto se debe asegurar que Postgres se esté corriendo. Para ejecutar Postgres se puede usar el comando `sudo service postgresql start`. Luego, en la consola de la API se debe ejecutar el comando `npm run start:dev` para correr la API en modo desarrollo. Al hacerlo, se migrará la base de datos de manera automática, creando las tablas necearias para ejecutar el proyecto. A menos que se especifique en el archivo `.env`, la API correrá en el puerto 3000.


En el directorio del Broker, se debe crear un archivo `.env` con las siguientes variables de entorno:

```
HOST=broker.iic2173.org
PORT=9000
USERNAME=students
PASSWORD=iic2173-2024-1-students
API_URL=http://{api_host}:{api_port}/flights
```

donde `{api_host}` y `{api_port}` deben coincidir con las variables determinadas en la configuración de entorno de la API. Luego, para ejecutar el broker, se debe usar el comando `npm run dev`. Si la API no está corriendo cuando se escucha algún mensaje de parte del broker, el broker informará un error a la hora de tratar de redirigir la información a la API.
