import { bind, ComponentViewModel, element, NavigationService, template } from "@nivinjoseph/n-app";
import { given } from "@nivinjoseph/n-defensive";
import { inject } from "@nivinjoseph/n-ject";
import { Routes } from "../../pages/routes";
import "./custom-navbar-view.scss";

@template(require("./custom-navbar-view.html"))
@element("custom-navbar")
@inject("NavigationService")
@bind("tag")
export class CustomNavbarViewModel extends ComponentViewModel
{
    private readonly _navigationService: NavigationService;
    
    
    public constructor(navigationService: NavigationService)
    {
        super();
        
        given(navigationService, "navigationService").ensureHasValue().ensureIsObject();
        this._navigationService = navigationService;
    }
    
    protected override onMount(element: HTMLElement): void
    {
        super.onMount(element);
        
        console.log(this.getBound("tag"));
    }
    
    
    public gotoUserLogin(): void
    {
        this._navigationService.navigate(Routes.userLogin);
    }
}