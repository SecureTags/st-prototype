import { components, DialogService, PageViewModel, route, template } from "@nivinjoseph/n-app";
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
@inject("TagService", "AuthenticationService", "UserService", "DialogService")
@components(TagCardViewModel)    
export class UserDashboardViewModel extends PageViewModel
{
    private readonly _tagService: TagService;
    private readonly _authenticationService: AuthenticationService;
    private readonly _userService: UserService;
    private readonly _dialogService: DialogService;
    
    private _tags: ReadonlyArray<Tag> = [];
    private _user: User = null as any;
    
    
    public get tags(): ReadonlyArray<Tag> { return this._tags; }
    
    public get user(): User { return this._user; }
    
    
    public constructor(tagService: TagService, authenticationService: AuthenticationService, userService: UserService,
        dialogService: DialogService)
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
    }
    
    
    protected override async onEnter(): Promise<void>
    {
        this._dialogService.showLoadingScreen();
        
        try
        {
            const userId = await this._authenticationService.getCurrentUserId();
            this._user = await this._userService.fetchUserData(userId);
            this._tags = await this._tagService.fetchUserTags(userId);
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
}