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

## Add Bootstrap (This not in use we use index.html and local bootstrap asset)
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
 
Next step is to create a new npm script in "package.json" that generates the code based on the OpenAPI schema:
>{
  "scripts": {
"generate:projects-api": "openapi-generator generate -g typescript-angular -i https://raw.githubusercontent.com/mambarek/apis-definitions-repo/master/definitions/projects/v1/projects-api.yaml -o ./build/openapi/project -c apis/projects-api-config.json",
"generate:car-fleet-api": "openapi-generator generate -g typescript-angular -i https://raw.githubusercontent.com/mambarek/apis-definitions-repo/master/definitions/carfleet/v1/car-fleet-api.yaml -o ./build/openapi/cars -c apis/car-fleet-api-config.json",
"generate:employees-api": "openapi-generator generate -g typescript-angular -i https://raw.githubusercontent.com/mambarek/apis-definitions-repo/master/definitions/employees/v1/employees-api.yaml -o ./build/openapi/employees -c apis/employees-api-config.json"
  }
}
 
Run the script 
>npm run generate:projects-api

## Prepare Nexus npm registry
To authenticate clients that communicate with nexus-npm you have to add under security in nexus 
ein npm Baerer Token realm under Realms

## Publish th API to nmp
### IMPORTANT Go to ./build/openapi

#### Authentication and npm Registry
in package.json add the npm registry to publish to
>  "publishConfig": {
     "registry": "http://localhost:9181/repository/npm-private/"
   }

Add new authentication to npm registry file .npmrc with following content
>registry=http://localhost:8081/repository/npm-group/    
> YWRtaW46YWRtaW4xMjM0

build/openapi/projects/.npmrc
```
registry=http://localhost:9181/repository/npm-group/
_auth=YWRtaW46YWRtaW4xMjM0
```

### Building

To install the required dependencies and to build the typescript sources run:
```
npm install
npm run build
```
When compiler error occurred while building you can set the right TypeScript compiler in "package.json"
```
  "devDependencies": {  
    "@angular/common": "^10.0.9",  
    "@angular/compiler": "^10.0.9",  
    "@angular/compiler-cli": "^10.0.9",  
    "@angular/core": "^10.0.9",  
    "@angular/platform-browser": "^10.0.9",  
    "ng-packagr": "^9.0.1",  
    "reflect-metadata": "^0.1.3",  
    "rxjs": "^6.5.3",  
    "tsickle": "^0.38.0",  
    "typescript": ">=3.9.2 <4.1.0",  
    "zone.js": "^0.10.2"  
  }
 ```
### publishing
First build the package then run ```npm publish dist``` (don't forget to specify the `dist` folder!)
> cd build/openapi/projects
../build/openapi/projects> npm publish dist


### consuming

Navigate to the folder of your consuming project and run one of next commands.

npm install @angular-it2go/project-management-api --save


## Install the generated API
To use the generated API stubs you have to install the library.
Go to project root and run:

>npm install @angular-it2go/project-management-api --save

Now you can import and use the stubs in your Application 

Now the API Library is in npm registry and it s available for all developer so 
anyone can now use it with npm install or add it to dependencies in package.json

## Consume the API
The Generated API containing every thing you need. the files contain service classes. 
So you don't have to implement them manually. You have to configure them like set the BASE_PATH for the API  

It's generally a good practice to extend the src/environments/*.ts files by adding a corresponding base path:
```
export const environment = {  
   production: false,  
   employeesApiUrl: 'http://localhost:8010/api/v1/employees',  
   projectsApiUrl: 'http://localhost:8020/api/v1/pojects'  
 };
```
The shortest possible setup looks like this:
```
// src/app/app.module.ts
import { HttpClientModule } from '@angular/common/http';
import { ApiModule, BASE_PATH } from '@angular-schule/book-monkey-api';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    ApiModule
  ],
  providers: [
    {provide: projectBasePath, useValue: environment.projectsApiUrl},
    {provide: carBasePath, useValue: environment.carfleetApiUrl}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Caching search list when gos to details view
Caching Components in Angular is complex and there is no standard strategy
So after trying some ideas from the internet it works but there are a lot of bugs 
because of object references. The idea is to build a cache service, that provides a cache for
components data. Routing is then programmatically. we should save the data to cache service
before changing the route. After initializing the parent route we should read the data from cache then 
clean the cache data to be reinitialized from calling routing method.   

## Environment and Application Variable
Angular has no concept of deployment variable. "/environments/environment.ts" would be packaged in "dist/main.js" and there is no 
way to substitute the needed variables. To get rid of setting application variable at deployment time.  
The community has present many solutions on the internet.
One of them using an env template with a placeholder and substitute them with the unix "envsubst" command.

>https://pumpingco.de/blog/environment-variables-angular-docker/     

we add under assets two new files env.js and env.template.js
The placeholder in env.template.js can be substituted with deployment values in deployment scripts.  
In the Dockerfile we add this

```CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]``` 
 
## Switch Configuration/Profile
To add e new configuration. add it to angular.json
```
"configurations": {
    ...
    "cloud": {
      "fileReplacements": [
        {
          "replace": "src/assets/env.js",
          "with": "src/assets/env.cloud.js"
        }
      ]
    }
}
```
and in package.json add new script for this
```
"scripts": {
    "start:cloud": "ng serve --configuration=cloud",
    "build:cloud": "ng build",
}
```

Then you can run from CLI or change Intellij "Angular CLI"
```
ng start:cloud
```

##Testing
to add environment variables to tests we should add src/assets/env.js to angular.json

```
"test": {
...
"scripts": ["src/assets/env.js"]
...
}
```

