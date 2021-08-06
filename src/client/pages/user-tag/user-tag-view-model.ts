import { DialogService, PageViewModel, route, template } from "@nivinjoseph/n-app";
import { given } from "@nivinjoseph/n-defensive";
import { inject } from "@nivinjoseph/n-ject";
import { Tag } from "../../../sdk/proxies/tag/tag";
import { TagService } from "../../../sdk/services/tag-service/tag-service";
import { Routes } from "../routes";
import "./user-tag-view.scss";

@template(require("./user-tag-view.html"))
@route(Routes.userTag)
@inject("TagService", "DialogService")    
export class UserTagViewModel extends PageViewModel
{   
    private readonly _tagService: TagService;
    private readonly _dialogService: DialogService;
    
    private _tag: Tag = null as any;
    
    
    public get tag(): Tag { return this._tag; }
    
    
    public constructor(tagService: TagService, dialogService: DialogService)
    {
        super();
        
        given(tagService, "tagService").ensureHasValue().ensureIsObject();
        this._tagService = tagService;
        
        given(dialogService, "dialogService").ensureHasValue().ensureIsObject();
        this._dialogService = dialogService;
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