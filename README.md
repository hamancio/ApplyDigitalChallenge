<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">
  A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@nestjs/core" target="_blank">
    <img src="https://img.shields.io/npm/v/@nestjs/core?label=%40nestjs%2Fcore" alt="NPM Version" />
  </a>
  <a href="https://www.npmjs.com/package/@nestjs/common" target="_blank">
    <img src="https://img.shields.io/npm/v/@nestjs/common?label=%40nestjs%2Fcommon" alt="NPM Version" />
  </a>
  <a href="https://www.npmjs.com/package/@nestjs/testing" target="_blank">
    <img src="https://img.shields.io/npm/v/@nestjs/testing?label=%40nestjs%2Ftesting" alt="NPM Version" />
  </a>
  <a href="https://github.com/nestjs/nest/actions" target="_blank">
    <img src="https://github.com/nestjs/nest/workflows/build/badge.svg" alt="Build Status" />
  </a>
  <a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank">
    <img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master" alt="Coverage Status" />
  </a>
  <a href="https://discord.gg/nestjs" target="_blank">
    <img src="https://img.shields.io/discord/738625338157447464?label=Discord&logo=Discord&colorB=7289DA" alt="Discord" />
  </a>
  <a href="https://opencollective.com/nestjs" target="_blank">
    <img src="https://opencollective.com/nestjs/badge/backers.svg" alt="Backers on Open Collective" />
  </a>
  <a href="https://opencollective.com/nestjs" target="_blank">
    <img src="https://opencollective.com/nestjs/badge/sponsors.svg" alt="Sponsors on Open Collective" />
  </a>
  <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=GFJPFNTC9XV7L&currency_code=USD&source=url" target="_blank">
    <img src="https://img.shields.io/badge/Donate-PayPal-0070ba.svg?logo=paypal" alt="Donate" />
  </a>
</p>

## Description

CHALLENGE 
Context: We would like you to build a small API to test your knowledge of Back End Development and related technologies. 
The server, once an hour, should connect to the API (refer to the below url) which shows recently posted articles about Node.js on Hacker News. It should insert the data from the API into a database and also define a REST API which the client (e.g. Postman) will be used to retrieve the data. 
Hacker News URL: https://hn.algolia.com/api/v1/search_by_date?query=nodejs 
The service should return paginated results with a maximum of 5 items and should be able to be filtered by author, _tags, title and also be searchable by month word (e.g. september) using the “created_at” field. Also, this should permit the user to remove items and these ones should not reappear when the app is restarted. 
In order to access the endpoints, an authorization parameter with a JWT must be sent in the headers. 
STACK 
You must use the following technologies to build the app: 
● Active LTS version of Node.js + NestJS. 
● Database: MongoDB or PostgreSQL. 
● ORM: Mongoose or TypeORM. 
● API Doc: Swagger, should be exposed at /api/docs. 
● Docker 
©2022 Apply Digital Intellectual Property. All rights reserved.

CONSIDERATIONS 
● Node.js version active LTS 
● The server component should be coded in TypeScript. 
● At least 30% test coverage (statements) for the server component. ● The whole project has to be uploaded to GitLab. 
● The artifacts (server API) must be Dockerized. 

● To start the project there should be a docker-compose that uses both images and the database image. 


## Installation

```bash
$ npm install
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
# unit tests
$ npm run test

# e2e tests
$ npm run

