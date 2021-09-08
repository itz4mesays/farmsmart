## Farm Smart RESTFUL APIs

[![CircleCI](https://img.shields.io/circleci/project/github/contentful/the-example-app.nodejs.svg)](https://circleci.com/gh/contentful/the-example-app.nodejs)

## Introduction
The application contains list of RESTFUL APIs that allows for both web and mobile consumption

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/victorhez/FarmSmart-Backend.git
cd FarmSmart-Backend
```

## Install Node Packages
```bash
npm i
```

## Install Nodemon globally
```
npm i -g nodemon
```
Running some Sequelize Commands

## Create a model using sequelize
```bash
run npx sequelize-cli model:generate --name ModelName --attributes field1:string,field2:string,field3:string,field4:string
```

## Run Migration Files
```bash
run npm run migrate
```

## Steps for read-only access

To start the express server, run the following

```bash
npm run dev
```

Open [http://localhost:4100](http://localhost:4100) and take a look around.

## SwaggerIO Documentation
Open http://localhost:4100/v1/api-docs/

## Sample request of API calls
The sample request can be found inside the requests.rest file