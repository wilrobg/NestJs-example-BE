<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
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


## Solution

### Part1: SQL
```PLpgSQL
--Who are the first 10 authors ordered by date_of_birth?
select * from author order by date_of_birth limit 10;
```
```PLpgSQL
--What is the sales total for the author named “Lorelai Gilmore”?
select
  sum(quantity * item_price) sale
from
  sale_item s
  inner join book b on b.id = s.book_id
  inner join author a on a.id = b.author_id
where
  a.name ilike 'Lorelai Gilmore';
```
```PLpgSQL
--What are the top 10 performing authors, ranked by sales revenue?	
select
  a.name,
  sum(quantity * item_price) sale
from
  sale_item s
  inner join book b on b.id = s.book_id
  inner join author a on a.id = b.author_id
group by
  a.name
order by
  sale desc
LIMIT
  10;
```

### Part2: Basic API Endpoint
After configurate the .env file, hit the follow endpoint:
```
/bookstore?name=Maya%20Schamberger
```
***name*** parameter is optional

### Part3: API Performance

A layer was added to improve performances, it acts as a temporary data store providing high performance data access. For this API use ***built-in one***, an in-memory data store.

### Part4: Build Docker Container and steps to deploy

Creating a Dockerfile:
```bash
FROM node:12.19.0-alpine3.9 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:12.19.0-alpine3.9 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
```

### Build Docker image
The first step to deploying the application to Kubernetes is to build a Docker images. 
Build and tag the Docker image for the app:
```bash
docker build -t ravn_challenge .
```

then upload image to Docker Hub
```bash
docker push <username>/ravn-be-challenge:1.0.0
```

### Deploying the sample app to GKE
We are ready to to deploy the Docker image you built to your GKE cluster.
```bash
kubectl create deployment ravn-be-challenge --image=<username>/ravn-be-challenge:1.0.0
```

Set the baseline number of Deployment replicas to 3.
```bash
kubectl scale deployment ravn-be-challenge --replicas=3
```

Create a HorizontalPodAutoscaler resource for the api Deployment
```bash
kubectl autoscale deployment ravn-be-challenge --cpu-percent=80 --min=1 --max=5
```

To see the Pods created, run the following command:
```bash
kubectl get pods
```

Use the kubectl expose command to generate a Kubernetes Service for the ravn-be-challenge deployment
```bash
kubectl expose deployment ravn-be-challenge --name=ravn-be-challenge-service --type=LoadBalancer --port 80 --target-port 8080
```
Here, the --port flag specifies the port number configured on the Load Balancer, and the --target-port flag specifies the port number that the ravn-be-challenge container is listening on.

Run the following command to get the Service details for ravn-be-challenge-service:
```bash
kubectl get service
```
You get the external ip, to look up for the service

## License

Nest is [MIT licensed](LICENSE).
