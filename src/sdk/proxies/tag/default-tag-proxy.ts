import { given } from "@nivinjoseph/n-defensive";
import { Tag } from "./tag";
import firebase from "firebase/app";
import "firebase/firestore";

export class DefaultTagProxy implements Tag
{
    private readonly _db: firebase.firestore.Firestore;
    
    private readonly _id: string;
    private _productName: string;
    private _companyName: string;
    private _imageUrl: ReadonlyArray<string>;
    private _ownerId: string;
    private _isLost: boolean;
    
    
    public get id(): string { return this._id; }
    public get productName(): string { return this._productName; }
    public get companyName(): string { return this._companyName; }
    public get imageUrl(): ReadonlyArray<string> { return this._imageUrl; }
    public get ownerId(): string { return this._ownerId; }
    public get isLost(): boolean { return this._isLost; }
    
    
    public constructor(id: string, productName: string, companyName: string, imageUrl: ReadonlyArray<string>, ownerId: string, isLost: boolean)
    {
        given(id, "id").ensureHasValue().ensureIsString();
        this._id = id;
        
        given(productName, "productName").ensureHasValue().ensureIsString();
        this._productName = productName;
        
        given(companyName, "companyName").ensureHasValue().ensureIsString();
        this._companyName = companyName;
        
        given(imageUrl, "imageUrl").ensureIsArray();
        this._imageUrl = imageUrl;
        
        given(ownerId, "ownerId").ensureHasValue().ensureIsString();
        this._ownerId = ownerId;
        
        given(isLost, "isLost").ensureHasValue();
        this._isLost = isLost;
        
        firebase.app();
        
        this._db = firebase.firestore();
    }
    
    
    public async transferTagOwnership(targetOwnerId: string): Promise<void>
    {
        try
        {
            await this._db.collection("tags").doc(this._id).update({
                ownerId: targetOwnerId
            });
        }
        catch (e)
        {
            throw e;
        }
    }
    
    public async flagTagAsLost(): Promise<void>
    {
        try
        {
            await this._db.collection("tags").doc(this._id).update({
                isLost: true
            });
        }
        catch (e)
        {
            throw e;
        }
    }
}