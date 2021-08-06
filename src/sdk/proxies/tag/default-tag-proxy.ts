import { given } from "@nivinjoseph/n-defensive";
import { Uuid } from "@nivinjoseph/n-util";
import { Tag } from "./tag";

export class DefaultTagProxy implements Tag
{
    private readonly _id: string;
    private _productName: string;
    private _companyName: string;
    private _imageUrl: ReadonlyArray<string>;
    private _ownerName: string;
    
    
    public get id(): string { return this._id; }
    public get productName(): string { return this._productName; }
    public get companyName(): string { return this._companyName; }
    public get imageUrl(): ReadonlyArray<string> { return this._imageUrl; }
    public get ownerName(): string { return this._ownerName; }
    
    
    public constructor(productName: string, companyName: string, imageUrl: ReadonlyArray<string>, ownerName: string)
    {
        given(productName, "productName").ensureHasValue().ensureIsString();
        this._productName = productName;
        
        given(companyName, "companyName").ensureHasValue().ensureIsString();
        this._companyName = companyName;
        
        given(imageUrl, "imageUrl").ensureIsArray();
        this._imageUrl = imageUrl;
        
        given(ownerName, "ownerName").ensureIsString();
        this._ownerName = ownerName;
        
        this._id = Uuid.create();
    }
}