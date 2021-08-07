import { DialogService, PageViewModel, route, template } from "@nivinjoseph/n-app";
import { given } from "@nivinjoseph/n-defensive";
import { inject } from "@nivinjoseph/n-ject";
import { Tag } from "../../../sdk/proxies/tag/tag";
import { User } from "../../../sdk/proxies/user/user";
import { TagService } from "../../../sdk/services/tag-service/tag-service";
import { UserService } from "../../../sdk/services/user-service/user-service";
import { Routes } from "../routes";
import "./user-tag-view.scss";

@template(require("./user-tag-view.html"))
@route(Routes.userTag)
@inject("TagService", "DialogService", "UserService")    
export class UserTagViewModel extends PageViewModel
{   
    private readonly _tagService: TagService;
    private readonly _dialogService: DialogService;
    private readonly _userService: UserService;
    
    private _tag: Tag = null as any;
    private _user: User = null as any;
    
    
    public get tag(): Tag { return this._tag; }
    public get user(): User { return this._user; }
    
    
    public constructor(tagService: TagService, dialogService: DialogService, userService: UserService)
    {
        super();
        
        given(tagService, "tagService").ensureHasValue().ensureIsObject();
        this._tagService = tagService;
        
        given(dialogService, "dialogService").ensureHasValue().ensureIsObject();
        this._dialogService = dialogService;
        
        given(userService, "userService").ensureHasValue().ensureIsObject();
        this._userService = userService;
    }
    
    
    protected override async onEnter(id?: string): Promise<void>
    {
        given(id, "id").ensureHasValue();
        
        this._dialogService.showLoadingScreen();
        
        try
        {
            const retrievedTag = await this._tagService.fetchTag(id!);
            
            if (retrievedTag)
            {
                this._tag = retrievedTag;
                
                this._user = await this._userService.fetchUserData(retrievedTag.ownerId);
            }
                
            
        }
        catch (e)
        {
            console.error(e);
        }
        finally
        {
            this._dialogService.hideLoadingScreen();
        }
    }
}