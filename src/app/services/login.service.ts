import { Injectable } from '@angular/core';

import {AuthConfig, OAuthService} from "angular-oauth2-oidc";
import {environment} from "../../environments/environment";

/**
 * The OAuth Login uses "angular-oauth2-oidc" vom Manfred Steyer
 * Single-page apps
 * Cannot securely store a Client Secret because their entire source is available to the browser.
 * Given these situations, OAuth 2.0 provides a version of the Authorization Code Flow which makes
 * use of a Proof Key for Code Exchange (PKCE) (defined in OAuth 2.0 RFC 7636).
 * The PKCE-enhanced Authorization Code Flow introduces a secret created by the calling application
 * that can be verified by the authorization server; this secret is called the Code Verifier.
 * Additionally, the calling app creates a transform value of the Code Verifier called
 * the Code Challenge and sends this value over HTTPS to retrieve an Authorization Code.
 * This way, a malicious attacker can only intercept the Authorization Code, and they cannot
 * exchange it for a token without the Code Verifier.
 */
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
