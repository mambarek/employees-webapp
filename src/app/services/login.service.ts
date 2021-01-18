import { Injectable } from '@angular/core';

import {AuthConfig, OAuthService} from "angular-oauth2-oidc";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private oauthService: OAuthService) {
    this.configure();
  }

  authConfig: AuthConfig = {
    issuer: environment.oauthIssuerUrl,
    redirectUri: window.location.origin,
    clientId: environment.oauthClientId,
    scope: 'openid profile email offline_access',
    responseType: 'code',
    requireHttps: false,
    // at_hash is not present in id token in older versions of keycloak.
    // use the following property only if needed!
    // disableAtHashCheck: true,
    showDebugInformation: true
  }

  private configure() {
    console.log("-- LoginService configure", this.authConfig);
    this.oauthService.configure(this.authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    // To automatically refresh a token when/ some time before it expires
    // it not works automatically as mentioned in the docs. you have to call it explicitly
    this.oauthService.setupAutomaticSilentRefresh();
  }

  public login() {
    this.oauthService.initLoginFlow();
    console.log('--> Login success claims', this.oauthService.getIdentityClaims());
  }

  public logout() {
    this.oauthService.logOut();
  }

  public isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  public getIdentityClaims(){
    return this.oauthService.getIdentityClaims();
  }
}
