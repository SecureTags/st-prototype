import { User } from "./user";
import firebase from "firebase/app";
import "firebase/firestore";

export class DefaultUserProxy implements User
{
    private readonly _db: firebase.firestore.Firestore;
    
    private readonly _id: string = "";
    private _firstName: string = "";
    private _lastName: string = "";
    private _profileImageUrl: string = "";
    private _tags: ReadonlyArray<string> = [];
    
    
    public get id(): string { return this._id; }
    public get firstName(): string { return this._firstName; }
    public get lastName(): string { return this._lastName; }
    public get profileImageUrl(): string { return this._profileImageUrl; }
    public get tags(): ReadonlyArray<string> { return this._tags; }
    
    
    public constructor(id: string, firstName: string, lastName: string, profileImageUrl: string,
        tags: ReadonlyArray<string>)
    {
        // TODO: Add Defensive Checks
        
        this._id = id;
        
        this._firstName = firstName;
        
        this._lastName = lastName;
        
        this._profileImageUrl = profileImageUrl;
        
        this._tags = tags;
        
        firebase.app();
        
        this._db = firebase.firestore();
    }
    
    
    public async transferTagOwnership(tagId: string, targetUserId: string): Promise<void>
    {
        // TODO: Add more defensive checks
        try
        {
            await this._db.collection("users").doc(this._id).update({
                tags: firebase.firestore.FieldValue.arrayRemove(tagId)
            });
            
            await this._db.collection("users").doc(targetUserId).update({
                tags: firebase.firestore.FieldValue.arrayUnion(tagId)
            });
        }
        catch (e)
        {
            throw e;
        }
    }
}