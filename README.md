# kube-ts-server

[![CircleCI](https://circleci.com/gh/kube-js/kube-ts-server.svg?style=svg)](https://circleci.com/gh/kube-js/kube-ts-server)
[![codecov](https://codecov.io/gh/kube-js/kube-ts-server/branch/master/graph/badge.svg)](https://codecov.io/gh/kube-js/kube-ts-server)
![GitHub tag (latest SemVer)](https://img.shields.io/github/tag/kube-js/kube-ts-server.svg)
![jscpd](assets/jscpd-badge.svg)

## Dockerized restful API powered by express/typescript ready to be deployed on kubernetes cluster

## Demo - deployed on digital ocean kubernetes cluster

[https://demo.mariuszrajczakowski.me/api/v1](https://demo.mariuszrajczakowski.me/api/v1)

## Docs

[https://kubetsserver.docs.apiary.io](https://kubetsserver.docs.apiary.io)

## Getting started

- clone the repo

```js
git clone git@github.com:kube-js/kube-ts-server.git
```

- install all dependencies

```js
npm install
```

- migrates and seeds a project

```js
npm run setup
```

- build the project

```js
npm run build
```

- run the server (for production, after build)

```js
npm run start
```

- run the server (for dev purposes, has a watch mode)

```js
npm run dev
```

- run tests

```js
npm run test

npm run test:watch
```
## Currently includes the following models:
- users
- userRole
- roles
- rolePermission
- permissions
- resetPasswordTokens
- courses
- enrolments
- sections
- objects

## This repo would not exist if not inspiration coming from:

- [ryansmith94](https://github.com/ryansmith94):
  - [js-entity-repos](https://github.com/js-entity-repos)
  - [js-migrations](https://github.com/js-migrations)
  - [rulr](https://github.com/ryansmith94/rulr/)
- vinaysahni.com:
  - [best-practices-for-a-pragmatic-restful-api](https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api)
  - [http://dev.enchant.com](http://dev.enchant.com)

## Credits:

- [banzaicloud.com](https://banzaicloud.com/blog/nodejs-in-production/)
