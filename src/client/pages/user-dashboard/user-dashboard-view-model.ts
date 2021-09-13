import { components, DialogService, NavigationService, PageViewModel, route, template } from "@nivinjoseph/n-app";
import { given } from "@nivinjoseph/n-defensive";
import { inject } from "@nivinjoseph/n-ject";
import { Tag } from "../../../sdk/proxies/tag/tag";
import { User } from "../../../sdk/proxies/user/user";
import { AuthenticationService } from "../../../sdk/services/authentication-service/authentication-service";
import { TagService } from "../../../sdk/services/tag-service/tag-service";
import { UserService } from "../../../sdk/services/user-service/user-service";
import { Routes } from "../routes";
import { TagCardViewModel } from "./components/tag-card/tag-card-view-model";
import "./user-dashboard-view.scss";

@template(require("./user-dashboard-view.html"))
@route(Routes.userDashboard)
@inject("TagService", "AuthenticationService", "UserService", "DialogService", "NavigationService")
@components(TagCardViewModel)    
export class UserDashboardViewModel extends PageViewModel
{
    private readonly _tagService: TagService;
    private readonly _authenticationService: AuthenticationService;
    private readonly _userService: UserService;
    private readonly _dialogService: DialogService;
    private readonly _navigationService: NavigationService;
    
    private _tags: ReadonlyArray<Tag> = [];
    private _user: User = null as any;
    
    
    public get tags(): ReadonlyArray<Tag> { return this._tags; }
    
    public get user(): User { return this._user; }
    
    
    public constructor(tagService: TagService, authenticationService: AuthenticationService, userService: UserService,
        dialogService: DialogService, navigationService: NavigationService)
    {
        super();
        
        given(tagService, "tagService").ensureHasValue().ensureIsObject();
        this._tagService = tagService;
        
        given(authenticationService, "authenticationService").ensureHasValue().ensureIsObject();
        this._authenticationService = authenticationService;
        
        given(userService, "userService").ensureHasValue().ensureIsObject();
        this._userService = userService;
        
        given(dialogService, "dialogService").ensureHasValue().ensureIsObject();
        this._dialogService = dialogService;
        
        given(navigationService, "navigationService").ensureHasValue().ensureIsObject();
        this._navigationService = navigationService;
    }
    
    
    public gotoUserTransferOwnership(): void
    {
        this._navigationService.navigate(Routes.userEditTag);
    }
    
    
    protected override async onEnter(): Promise<void>
    {
        this._dialogService.showLoadingScreen();
        
        try
        {
            await this._authenticateAndRetrieveData();
        }
        catch (e)
        {
            console.error(e);
            this._dialogService.showErrorMessage("An error has occurred, please try again.", "Error");
        }
        finally
        {
            this._dialogService.hideLoadingScreen();
        }
    }
    
    
    private async _authenticateAndRetrieveData(): Promise<void>
    {
        try
        {
            const userId = this._authenticationService.getCurrentUserId();
            
            if (!userId)
            {
                this._navigationService.navigate(Routes.userLogin);
                return;
            }
            
            this._user = await this._userService.fetchUserData(userId);
            this._tags = await this._tagService.fetchUserTags(userId);
        }
        catch (e)
        {
            throw e;
        }
    }
}