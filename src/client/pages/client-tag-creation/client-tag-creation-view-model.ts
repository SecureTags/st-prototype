import { PageViewModel, route, template } from "@nivinjoseph/n-app";
import { given } from "@nivinjoseph/n-defensive";
import { inject } from "@nivinjoseph/n-ject";
import { TagService } from "../../../sdk/services/tag-service/tag-service";
import { Routes } from "../routes";
import "./client-tag-creation-view.scss";

@template(require("./client-tag-creation-view.html"))
@route(Routes.clientTagCreation)
@inject("TagService")    
export class ClientTagCreationViewModel extends PageViewModel
{
    private readonly _tagService: TagService;
    
    private _productName: string = "";
    private _companyName: string = "";
    private _imageUrl: string = "";
    private _ownerName: string = "";
    
    
    public get productName(): string { return this._productName; }
    public set productName(value: string) { this._productName = value; }
    
    public get companyName(): string { return this._companyName; }
    public set companyName(value: string) { this._companyName = value; }
    
    public get imageUrl(): string { return this._imageUrl; }
    public set imageUrl(value: string) { this._imageUrl = value; }
    
    public get ownerName(): string { return this._ownerName; }
    public set ownerName(value: string) { this._ownerName = value; }
    
    
    
    public constructor(tagService: TagService)
    {
        super();
        
        given(tagService, "tagService").ensureHasValue().ensureIsObject();
        this._tagService = tagService;
    }
    
    
    public async createTag(): Promise<void>
    {
        try
        {
            await this._tagService.createTag(this._productName, this._companyName, [this._imageUrl], this._ownerName);
        }
        catch (e)
        {
            console.error(e);
        }
    }
}