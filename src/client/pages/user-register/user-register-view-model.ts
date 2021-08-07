import { DialogService, NavigationService, PageViewModel, route, template } from "@nivinjoseph/n-app";
import { given } from "@nivinjoseph/n-defensive";
import { inject } from "@nivinjoseph/n-ject";
import { AuthenticationService } from "../../../sdk/services/authentication-service/authentication-service";
import { Routes } from "../routes";
import "./user-register-view.scss";

@template(require("./user-register-view.html"))
@route(Routes.userRegister)
@inject("NavigationService", "DialogService", "AuthenticationService")
export class UserRegisterViewModel extends PageViewModel
{
    private readonly _navigationService: NavigationService;
    private readonly _dialogService: DialogService;
    private readonly _authenticationService: AuthenticationService;
    
    private _email: string = "";
    private _password: string = "";
    private _firstName: string = "";
    private _lastName: string = "";
    
    
    public get email(): string { return this._email; }
    public set email(value: string) { this._email = value; }
    
    public get password(): string { return this._password; }
    public set password(value: string) { this._password = value; }
    
    public get firstName(): string { return this._firstName; }
    public set firstName(value: string) { this._firstName = value; }
    
    public get lastName(): string { return this._lastName; }
    public set lastName(value: string) { this._lastName = value; }
    
    
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
            await this._authenticationService.signUp(this._email, this._password, this._firstName,
                this._lastName, []);
            
            this._navigationService.navigate(Routes.userLogin);
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