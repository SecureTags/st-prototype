import { DialogService, NavigationService, PageViewModel, route, template } from "@nivinjoseph/n-app";
import "./client-login-view.scss";
import { Routes } from "../routes";
import { inject } from "@nivinjoseph/n-ject";
import { given } from "@nivinjoseph/n-defensive";
import { AuthenticationService } from "../../../sdk/services/authentication/authentication-service";

@template(require("./client-login-view.html"))
@route(Routes.clientLogin)
@inject("NavigationService", "DialogService", "AuthenticationService")
export class ClientLoginViewModel extends PageViewModel
{
    private readonly _navigationService: NavigationService;
    private readonly _dialogService: DialogService;
    private readonly _authenticationService: AuthenticationService;
    
    private _email: string = "";
    private _password: string = "";
    
    
    public get email(): string { return this._email; }
    public set email(value: string) { this._email = value; }
    
    public get password(): string { return this._password; }
    public set password(value: string) { this._password = value; }
    
    
    public constructor(navigationService: NavigationService, dialogService: DialogService,
        authenticationService: AuthenticationService)
    {
        super();
        
        given(navigationService, "navigationService").ensureHasValue().ensureIsObject();
        this._navigationService = navigationService;
        
        given(dialogService, "dialogService").ensureHasValue().ensureIsObject();
        this._dialogService = dialogService;
        
        given(authenticationService, "authenticationService").ensureHasValue().ensureIsObject();
        this._authenticationService = authenticationService;
    }
    
    
    public gotoRegister(): void
    {
        this._navigationService.navigate(Routes.clientRegister);
    }
    
    public async signIn(): Promise<void>
    {
        this._dialogService.showLoadingScreen();
        
        try
        {
            console.log(this._email);
            
            await this._authenticationService.signIn(this._email, this._password);
        }
        catch (e)
        {
            console.error(e);
            
            this._dialogService.showErrorMessage("There has been an error signing in. Please contact support.",
                "Error");
        }
        finally
        {
            this._dialogService.hideLoadingScreen();
        }
    }
}