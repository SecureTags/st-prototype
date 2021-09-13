import { ComponentViewModel, element, NavigationService, template } from "@nivinjoseph/n-app";
import { given } from "@nivinjoseph/n-defensive";
import { inject } from "@nivinjoseph/n-ject";
import { AuthenticationService } from "../../../sdk/services/authentication-service/authentication-service";
import { Routes } from "../../pages/routes";
import "./custom-user-navbar-view.scss";

@template(require("./custom-user-navbar-view.html"))
@element("custom-user-navbar")
@inject("NavigationService", "AuthenticationService")    
export class CustomUserNavbarViewModel extends ComponentViewModel
{
    private readonly _navigationService: NavigationService;
    private readonly _authenticationService: AuthenticationService;
    
    
    public constructor(navigationService: NavigationService, authenticationService: AuthenticationService)
    {
        super();
        
        given(navigationService, "navigationService").ensureHasValue().ensureIsObject();
        this._navigationService = navigationService;
        
        given(authenticationService, "authenticationService").ensureHasValue().ensureIsObject();
        this._authenticationService = authenticationService;
    }
    
    
    public async signOut(): Promise<void>
    {
        try
        {
            await this._authenticationService.signOut();
        }
        catch (e)
        {
            console.error(e);
        }
        finally
        {
            this._navigationService.navigate(Routes.userLogin);
        }
    }
    
    public gotoUserDashboard(): void
    {
        this._navigationService.navigate(Routes.userDashboard);
    }
    
    public gotoUserTransferOwnership(): void
    {
        this._navigationService.navigate(Routes.userEditTag);
    }
}