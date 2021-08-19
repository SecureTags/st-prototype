import { given } from "@nivinjoseph/n-defensive";
import { DefaultTagProxy } from "../../proxies/tag/default-tag-proxy";
import { Tag } from "../../proxies/tag/tag";
import { TagService } from "./tag-service";
import firebase from "firebase/app";
import "firebase/firestore";
import { Uuid } from "@nivinjoseph/n-util";

export class DefaultTagService implements TagService
{
    private readonly _db: firebase.firestore.Firestore;
    
    
    public constructor()
    {
        const firebaseConfig = {
            apiKey: "AIzaSyC45RUtQuCAQm0PBJPfCIfbfcOlFo8xkCU",
            authDomain: "project-st-b1b27.firebaseapp.com",
            projectId: "project-st-b1b27",
            storageBucket: "project-st-b1b27.appspot.com",
            messagingSenderId: "39093334369",
            appId: "1:39093334369:web:3f68b569825c1accdb1520",
            measurementId: "G-J4RQQP0F9S"
        };
        
        if (!firebase.apps.length)
        {
            firebase.initializeApp(firebaseConfig);
        }
        else
        {
            firebase.app();
        }
        
        this._db = firebase.firestore();
    }
    
    
    public async createTag(productName: string, companyName: string, imageUrl:
        ReadonlyArray<string>, userId: string): Promise<Tag>
    {
        given(productName, "productName").ensureHasValue().ensureIsString();     
        given(companyName, "companyName").ensureHasValue().ensureIsString();
        given(imageUrl, "imageUrl").ensureIsArray();
        given(userId, "userId").ensureHasValue().ensureIsString();
        
        if (!(await this._doesUserExist(userId)))
            throw new Error("User Does Not Exist");
        
        const newTag = new DefaultTagProxy(Uuid.create(), productName, companyName, imageUrl, userId, false);
        
        try
        {
            await this.createNewTagInDb(newTag, userId);
            await this.updateUserTags(userId, newTag);
        }
        catch (e)
        {
            throw e;
        }
        
        return newTag;
    }

    public async fetchTag(id: string): Promise<Tag>
    {
        given(id, "id").ensureHasValue().ensureIsString();
        
        let tagData = null;
        
        try
        {
            tagData = (await this._db.collection("tags").doc(id).get()).data();
            
            if (!tagData)
                throw new Error("Error Referencing Tag");
        }
        catch (e)
        {
            throw e;
        }
        
        return new DefaultTagProxy(id, tagData.productName, tagData.companyName, tagData.imageUrl, tagData.ownerId,
            tagData.isLost);
    }
    
    public async fetchUserTags(userId: string): Promise<ReadonlyArray<Tag>>
    {
        given(userId, "userId").ensureHasValue().ensureIsString();
        
        if (!(await this._doesUserExist(userId)))
            throw new Error("User Does Not Exist");
        
        const userTags: Array<Tag> = [];
        
        let userTagIds: Array<string> = null as any;
        
        try
        {
            let userData = (await this._db.collection("users").doc(userId).get()).data();
            
            if (userData && userData.tags)
            {
                userTagIds = userData.tags;
                
                for (let userTagId of userTagIds)
                {
                    const tagData = (await this._db.collection("tags").doc(userTagId).get()).data();
                    
                    if (tagData)
                        userTags.push(new DefaultTagProxy(userTagId, tagData.productName, tagData.companyName,
                            tagData.imageUrl, tagData.ownerId, tagData.isLost));
                }
                
                return userTags;
            }
            else
            {
                return [];
            }
        }
        catch (e)
        {
            throw e;
        }
    }
    
    
    private async _doesUserExist(userId: string): Promise<boolean>
    {
        try
        {
            return (await this._db.collection("users").doc(userId).get()).exists;
        }
        catch (e)
        {
            throw e;
        }
    }
    
    private async createNewTagInDb(newTag: DefaultTagProxy, userId: string)
    {
        try
        {
            await this._db.collection("tags").doc(newTag.id).set({
                productName: newTag.productName,
                companyName: newTag.companyName,
                imageUrl: newTag.imageUrl,
                ownerId: userId,
            });
        }
        catch (e)
        {
            throw e;
        }
    }
    
    private async updateUserTags(userId: string, newTag: DefaultTagProxy)
    {
        try
        {
            await this._db.collection("users").doc(userId).update({
                tags: firebase.firestore.FieldValue.arrayUnion(newTag.id)
            });
        }
        catch (e)
        {
            throw e;
        }
    }
}