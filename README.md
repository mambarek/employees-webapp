# EmployeesWebapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Add Routing to app

Use the CLI to generate it.

>ng generate module app-routing --flat --module=app

## Generate Open API Client
>https://www.npmjs.com/package/@openapitools/openapi-generator-cli

It is recommended to install the package as development dependency, because normally you only need this dependency during the development process. To do that you can type the following:  

Install the latest version of "openapi-generator-cli" 
>npm install @openapitools/openapi-generator-cli -D
  
install a specific version of "openapi-generator-cli" 
>npm install @openapitools/openapi-generator-cli@cli-3.0.0 -D
 
Next step is to create a new npm script in package.json that generates the code based on the OpenAPI schema:
>{
  "scripts": {
    "generate:api": "openapi-generator generate -g typescript-angular -i ../openapi/schema.yaml -o ./build/openapi"
  }
}

Now a concrete example for projects API
>"generate:project-api": "openapi-generator generate -g typescript-angular -i http://localhost:8020/v3/api-docs.yaml -o ./build/openapi"
 
Run the script 
>npm run generate:project-api

## Prepare Nexus npm registry
To authenticate clients that communicate with nexus-npm you have to add under security in nexus 
ein npm Baerer Token realm under Realms

## Publish th API to nmp
Go to ./build/openapi

#### Authentication and npm Registry
in package.json add the npm registry to publish to
>  "publishConfig": {
     "registry": "http://localhost:8081/repository/npm-private/"
   }

Add new authentication to npm registry file .npmrc with following content
>registry=http://localhost:8081/repository/npm-group/
 YWRtaW46YWRtaW4xMjM0

### Building

To install the required dependencies and to build the typescript sources run:
```
npm install
npm run build
```

### publishing

First build the package then run ```npm publish dist``` (don't forget to specify the `dist` folder!)

### consuming

Navigate to the folder of your consuming project and run one of next commands.

_published:_


npm install @angular-it2go/project-management-api@1.0.0-SNAPSHOT.202008211012 --save


## Install the generated API
To use the generated API stubs you have to install the library.
Go to project root and run:
>npm install @angular-it2go/project-management-api --save

Now you can import and use the stubs in your Application 

## It works but this not practical 
It's ok now the API Library is in npm registry and it s available for all developer so 
anyone can now use it with npm install or add it to dependencies in package.json

## Consume the API
The Generated API containing every thing you need. the files contains Service Classes 
so you don't have to implement them manually 
