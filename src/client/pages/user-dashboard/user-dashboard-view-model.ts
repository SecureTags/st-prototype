import { PageViewModel, route, template } from "@nivinjoseph/n-app";
import { given } from "@nivinjoseph/n-defensive";
import { inject } from "@nivinjoseph/n-ject";
import { TagService } from "../../../sdk/services/tag-service/tag-service";
import { Routes } from "../routes";
import "./user-dashboard-view.scss";

@template(require("./user-dashboard-view.html"))
@route(Routes.userDashboard)
@inject("TagService")    
export class UserDashboardViewModel extends PageViewModel
{
    private readonly _tagService: TagService;
    
    private _userId: string = "";
    
    
    public get userId(): string { return this._userId; }
    public set userId(value: string) { this._userId = value; }
    
    
    public constructor(tagService: TagService)
    {
        super();
        
        given(tagService, "tagService").ensureHasValue().ensureIsObject();
        this._tagService = tagService;
    }
    
    
    public async fetchUserTags(): Promise<void>
    {
        try
        {
            const userTags = await this._tagService.fetchUserTags(this._userId);
            console.log(userTags);
        }
        catch (e)
        {
            console.error(e);
        }
    }
}