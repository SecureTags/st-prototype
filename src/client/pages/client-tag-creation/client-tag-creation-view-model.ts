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
    private _imageUrl1: string = "";
    private _imageUrl2: string = "";
    private _imageUrl3: string = "";
    private _userId: string = "";
    
    
    public get productName(): string { return this._productName; }
    public set productName(value: string) { this._productName = value; }
    
    public get companyName(): string { return this._companyName; }
    public set companyName(value: string) { this._companyName = value; }
    
    public get imageUrl(): string { return this._imageUrl; }
    public set imageUrl(value: string) { this._imageUrl = value; }
    
    public get imageUrl1(): string { return this._imageUrl1; }
    public set imageUrl1(value: string) { this._imageUrl1 = value; }
    
    public get imageUrl2(): string { return this._imageUrl2; }
    public set imageUrl2(value: string) { this._imageUrl2 = value; }
    
    public get imageUrl3(): string { return this._imageUrl3; }
    public set imageUrl3(value: string) { this._imageUrl3 = value; }

    public get userId(): string { return this._userId; }
    public set userId(value: string) { this._userId = value; }
    
    
    
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
            await this._tagService.createTag(this._productName, this._companyName, [this._imageUrl,
            this._imageUrl1, this._imageUrl2, this._imageUrl3], this._userId);
        }
        catch (e)
        {
            console.error(e);
        }
    }
}