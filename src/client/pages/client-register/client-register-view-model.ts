import { DialogService, NavigationService, PageViewModel, route, template } from "@nivinjoseph/n-app";
import { given } from "@nivinjoseph/n-defensive";
import { inject } from "@nivinjoseph/n-ject";
import { AuthenticationService } from "../../../sdk/services/authentication/authentication-service";
import { Routes } from "../routes";
import "./client-register-view.scss";

@template(require("./client-register-view.html"))
@route(Routes.clientRegister)
@inject("NavigationService", "DialogService", "AuthenticationService")
export class ClientRegisterViewModel extends PageViewModel
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
        
        given(dialogService, "DialogService").ensureHasValue().ensureIsObject();
        this._dialogService = dialogService;
        
        given(authenticationService, "authenticationService").ensureHasValue().ensureIsObject();
        this._authenticationService = authenticationService;
    }
    
    
    public async signUp(): Promise<void>
    {
        this._dialogService.showLoadingScreen();
        
        try
        {
            await this._authenticationService.signUp(this._email, this._password);
            
            this._navigationService.navigate(Routes.clientLogin);
        }
        catch (e)
        {
            console.error(e);
            
            this._dialogService.showErrorMessage("There has been an error signing up. Please contact support.",
                "Error");
        }
        finally
        {
            this._dialogService.hideLoadingScreen();
        }
    }
}