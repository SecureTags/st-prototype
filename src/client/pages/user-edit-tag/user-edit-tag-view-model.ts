import { DialogService, NavigationService, PageViewModel, route, template } from "@nivinjoseph/n-app";
import { given } from "@nivinjoseph/n-defensive";
import { inject } from "@nivinjoseph/n-ject";
import { Tag } from "../../../sdk/proxies/tag/tag";
import { User } from "../../../sdk/proxies/user/user";
import { AuthenticationService } from "../../../sdk/services/authentication-service/authentication-service";
import { TagService } from "../../../sdk/services/tag-service/tag-service";
import { UserService } from "../../../sdk/services/user-service/user-service";
import { Routes } from "../routes";
import "./user-edit-tag-view.scss";

@template(require("./user-edit-tag-view.html"))
@route(Routes.userEditTag)
@inject("TagService", "AuthenticationService", "UserService", "DialogService", "NavigationService")
export class UserEditTagViewModel extends PageViewModel
{
    private readonly _userService: UserService;
    private readonly _tagService: TagService;
    private readonly _dialogService: DialogService;
    private readonly _authenticationService: AuthenticationService;
    private readonly _navigationService: NavigationService;
    
    private _targetOwnerId: string = "";
    private _user: User = null as any;
    private _tags: ReadonlyArray<Tag> = null as any;
    private _isTagDropdownOpen: boolean = false;
    private _isActionDropdownOpen: boolean = false;
    private _selectedTag: Tag = null as any;
    private _selectedAction: string = null as any;
    
    
    public get targetOwnerId(): string { return this._targetOwnerId; }
    public set targetOwnerId(value: string) { this._targetOwnerId = value; }
    
    public get user(): User { return this._user; }
    
    public get tags(): ReadonlyArray<Tag> { return this._tags; }
    
    public get isTagDropdownOpen(): boolean { return this._isTagDropdownOpen; }
    
    public get isActionDropdownOpen(): boolean { return this._isActionDropdownOpen; }
    
    public get selectedTag(): Tag { return this._selectedTag; }
    
    public get selectedAction(): string { return this._selectedAction; }
    
    public get selectTagDropdownPlaceholder(): string
    {
        return this._selectedTag ? `${this._selectedTag.companyName}, ${this._selectedTag.productName}` :
            "Select Tag";
    }
    
    public get selectActionDropdownPlaceholder(): string
    {
        return this._selectedAction ? this._selectedAction : "Select Action";
    }
    
    
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
    
    
    public async transferTagOwnership(): Promise<void>
    {   
        try
        {
            const hasError = !(await this._transferTagOwnershipCanaryCheck());
            
            if (hasError)
                return;
            
            await this._user.transferTagOwnership(this._selectedTag.id, this._targetOwnerId);
            await this._selectedTag.transferTagOwnership(this._targetOwnerId);
            
            await this._authenticateAndRetrieveData();
            
            this._dialogService.showSuccessMessage("Ownership transfer successful!", "Success");
            
            this._selectedTag = null as any;
        }
        catch (e)
        {
            console.error(e);
        }
    }
    
    public openTagDropdown(): void
    {
        this._isTagDropdownOpen = !this._isTagDropdownOpen;
    }
    
    public openActionDropdown(): void
    {
        this._isActionDropdownOpen = !this._isActionDropdownOpen;
    }
    
    public selectTag(tag: Tag): void
    {
        given(tag, "tag").ensureHasValue().ensureIsObject();
        
        this._selectedTag = tag;
        
        this._isTagDropdownOpen = false;
    }
    
    public selectAction(action: string): void
    {
        given(action, "action").ensureHasValue().ensureIsString();
        
        this._selectedAction = action;
        
        this._isActionDropdownOpen = false;
    }
    
    public async flagTagAsLost(): Promise<void>
    {
        try
        {
            await this._selectedTag.flagTagAsLost();
            
            this._dialogService.showSuccessMessage(`Tag has been marked as lost!`, "Success");
        }
        catch (e)
        {
            console.error(e);
        }
    }
    
    public async flagTagAsFound(): Promise<void>
    {
        try
        {
            await this._selectedTag.flagTasAsFound();
            
            this._dialogService.showSuccessMessage(`Tag has been marked as found!`, "Success");
        }
        catch (e)
        {
            console.error(e);
        }
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
    
    private async _transferTagOwnershipCanaryCheck(): Promise<boolean>
    {
        try
        {
            if (this._targetOwnerId === this._user.id)
            {
                this._dialogService.showErrorMessage("You cannot transfer to yourself.", "Error");
                return false;
            }
            
            if (!(await this._userService.checkIfUserExist(this._targetOwnerId)))
            {
                this._dialogService.showErrorMessage("User does not exist.", "Error");
                return false;
            }
            
            return true;
        }
        catch (e)
        {
            console.error(e);
            return false;
        }
    }
}