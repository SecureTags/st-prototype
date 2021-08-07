import { bind, ComponentViewModel, element, NavigationService, template } from "@nivinjoseph/n-app";
import { given } from "@nivinjoseph/n-defensive";
import { inject } from "@nivinjoseph/n-ject";
import { Tag } from "../../../../../sdk/proxies/tag/tag";
import { Routes } from "../../../routes";
import "./tag-card-view.scss";

@template(require("./tag-card-view.html"))
@element("tag-card")
@bind("tag")
@inject("NavigationService")
export class TagCardViewModel extends ComponentViewModel
{
    private readonly _navigationService: NavigationService;
    
    
    private get _tag(): Tag { return this.getBound<Tag>("tag"); }
    
    
    public constructor(navigationService: NavigationService)
    {
        super();
        
        given(navigationService, "navigationService").ensureHasValue().ensureIsObject();
        this._navigationService = navigationService;
    }
    
    
    public gotoUserTag(): void
    {
        this._navigationService.navigate(Routes.userTag, { id: this._tag.id });
    }
}