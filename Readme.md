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

## Setup MySQL Database locally

```
- Create a database with name 'farmsmart'
- Inside the .env file, set your database credentials. Leave DB_Password blank if there is no password
```

## Run Migration Files
```bash
npm run migrate
```

Running some Sequelize Commands

## Create a model using sequelize
```bash
npx sequelize-cli model:generate --name ModelName --attributes field1:string,field2:string,field3:string,field4:string
```

## Steps for read-only access

To start the express server, run the following

```bash
npm run dev
```

Open [http://localhost:4100/v1](http://localhost:4100/v1) and take a look around.

## SwaggerIO Documentation
Open http://localhost:4100/v1/api-docs/

## Postman Collection Documentation
Open [https://documenter.getpostman.com/view/7643909/U16nKivk](Click here to View) and take a look around.


## Sample request of API calls
The sample request can be found inside the requests.rest file