// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// The env values are defined in /assets/env.template.js
export const environment = {
  production: false,
  employeesApiUrl: 'http://localhost:8010',
  projectsApiUrl: 'http://localhost:8020',
  carfleetApiUrl: 'http://localhost:8030',
  oauthIssuerUrl: window['env']['oauthIssuerUrl'] || 'http://localhost:8080/auth/realms/employees-webapp',
  oauthClientId: window['env']['oauthClientId'] || 'ema_pkce'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
