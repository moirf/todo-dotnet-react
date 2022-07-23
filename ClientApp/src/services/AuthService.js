import AppSettingsService from './AppSettingsService';
import {
    AccountInfo, Configuration, AuthenticationResult,
    PublicClientApplication, SilentRequest, RedirectRequest,
    EndSessionRequest,
    InteractionRequiredAuthError
} from "@azure/msal-browser"
import * as microsoftTeams from "@microsoft/teams-js";

class AuthService {
    constructor(appSettings) {
        if (!appSettings) {
            throw new Error('the app settings service was not provided');
        }

        this.appSettings = appSettings;

        let msalConfig = appSettings.GetMsalClientConfiguration();
        this.msalApplication = new PublicClientApplication(msalConfig);

        this._OnAuthenticateSuccess = this._OnAuthenticateSuccess.bind(this);
        this._OnAuthenticateFailure = this._OnAuthenticateFailure.bind(this);

    }

    HandlePageLoadEvent() {
        // If no data to parse we are not in redirect, continue page load as usual
        return this.msalApplication.handleRedirectPromise()
            .then((authResult) =>
            {
                this.HandleRedirectResponse(authResult);
            })
            .catch((error) => { microsoftTeams.authentication.notifyFailure(error) });
    }

    HandleRedirectResponse(authResult) {
        // if this page load is redirect from the Microsoft Identity platform then the
        // authResult will be populated. Otherwise null on other page loads.
        console.log(authResult);
        if (authResult !== null) {
            
            // save the fresh account info from the result.
            this.account = authResult.account;
            microsoftTeams.authentication.notifySuccess(authResult.account);
        }
        else {
            //microsoftTeams.authentication.notifyFailure("No authorization result received")
            
            // see if we have cached accounts.
            const currentAccounts = this.msalApplication.getAllAccounts();

            if (currentAccounts === null) {
                // no cached accounts. 
                // user will need to click the sign-in button and redirect to login.

                return;
            }
            else if (currentAccounts.length > 1) {
                // there are some situations where the user may have multiple (different) cached logins.
                // this code sample does not cover that scenario but just logs a warning here.
                // this conditional block would need to be updated to support multiple accounts.
                // otherwise it will just grab the first one below.
                console.warn("Multiple accounts detected in MSAL account cache.");
                this.account = currentAccounts[0];
                microsoftTeams.authentication.notifySuccess(currentAccounts[0]);
            }
            else if (currentAccounts.length === 1) {
                // we have exactly 1 cached account.
                // set the account info. user may not need to sign in.
                
                this.account = currentAccounts[0];
                microsoftTeams.authentication.notifySuccess(currentAccounts[0]);
            }            
        }
    }

    GetCalendarApiToken() {
        let tokenRequest = {
            account: this.account,
            scopes: [this.appSettings.GetMsalCalendarReadScope()]
        }
        return this._GetToken(tokenRequest)
    }

    GetTodoApiToken() {
        let tokenRequest = {
            account: this.account,
            scopes: [this.appSettings.GetMsalClientScope(), "email"]
        }
        return this._GetToken(tokenRequest)   
    }

    Authenticate() {
        const onSuccess = this._OnAuthenticateSuccess;
        const onFailure = this._OnAuthenticateFailure;

        return new Promise((resolve, reject) => {
            microsoftTeams.authentication.authenticate({
                url: window.location.origin + '/tab-auth',
                width: 600,
                height: 535,
                successCallback: (result) => {
                    onSuccess(result, resolve);
                },
                failureCallback: (reason) => {
                    onFailure(reason, reject);
                }
            }); 
        })      
    }

    SignIn() {
        let loginRedirectRequestPayload = {
            scopes: [this.appSettings.GetMsalClientScope(), this.appSettings.GetMsalCalendarReadScope(), "email"],
            prompt: "select_account"
        }

        // this will redirect the web application to the Microsoft Identity platform sign in pages.
        // no code will execute after this point.
        this.msalApplication.loginRedirect(loginRedirectRequestPayload);  
    }

    SignOut() {
        if (!this.account) {
            // no cached login to signout
            return;
        }

        let accountInfo = this.msalApplication.getAccountByUsername(this.account?.username);

        if (accountInfo !== null) {
            let logoutRequestPayload = {
                account: accountInfo
            }

            this.msalApplication.logout(logoutRequestPayload)
        }
    }

    _GetToken(tokenRequest) {
        const msalApplication = this.msalApplication;
        // msal will return the cached token if present, or call to get a new one
        // if it is expired or near expiring.
        return this.msalApplication.acquireTokenSilent(tokenRequest)
            .then(token => {
                console.log(token);
                return token
            })
            .catch((error) => {
                console.log(error);
                return msalApplication.acquireTokenPopup(tokenRequest)
                    .then(tokenRequest => tokenRequest)
                    .catch((error) => { throw error });
                if (error instanceof InteractionRequiredAuthError) {
                    console.log("Interaction required");
                };
            }); 
    }

    _OnAuthenticateSuccess(account, resolve) {
        console.log(account);
        this.account = account;
        resolve();
    }

    _OnAuthenticateFailure(reason, reject) {
        console.log(reason);
        console.log(this);
        reject();
    }
}

export default AuthService;