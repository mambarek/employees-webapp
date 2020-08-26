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

## Add Bootstrap 
>npm install bootstrap --save

in angular.json
>.....
     "styles": [
       "node_modules/bootstrap/dist/css/bootstrap.min.css",
       "src/styles.css"
     ],
 .....

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
### IMPORTANT Go to ./build/openapi

#### Authentication and npm Registry
in package.json add the npm registry to publish to
>  "publishConfig": {
     "registry": "http://localhost:8081/repository/npm-private/"
   }

Add new authentication to npm registry file .npmrc with following content
>registry=http://localhost:8081/repository/npm-group/    
> YWRtaW46YWRtaW4xMjM0

### Building

To install the required dependencies and to build the typescript sources run:
```
npm install
npm run build
```
When compiler error occurred while building you can set the right TypeScript compiler in package.json
>
 > "devDependencies": {  
    "@angular/common": "^10.0.9",  
    "@angular/compiler": "^10.0.9",  
    "@angular/compiler-cli": "^10.0.9",  
    "@angular/core": "^10.0.9",  
    "@angular/platform-browser": "^10.0.9",  
    "ng-packagr": "^9.0.1",  
    "reflect-metadata": "^0.1.3",  
    "rxjs": "^6.5.3",  
    "tsickle": "^0.38.0",  
    <b>"typescript": ">=3.9.2 <4.0.0"</b>,  
    "zone.js": "^0.10.2"  
  }
    
### publishing
First build the package then run ```npm publish dist``` (don't forget to specify the `dist` folder!)
> cd build/openapi
build/openapi> npm publish dist


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
so you don't have to implement them manually.

## Caching search list when gos to details view
Caching Components in Angluar is complex and there is no standard strategy
So after trying some ideas from the internet it works but there are a lost of bugs 
because of object references. The idea is to build a cache service, tha provides a cache for
components data. Routing is then programmatically. we should save the data to cache service
before changing the route. When initialize the parent route we should read the data from cache then 
clean the cache data to be reinitialized from calling routing method.    
  
