import { given } from "@nivinjoseph/n-defensive";
import { DefaultTagProxy } from "../../proxies/tag/default-tag-proxy";
import { Tag } from "../../proxies/tag/tag";
import { TagService } from "./tag-service";
import firebase from "firebase/app";
import "firebase/firestore";

export class DefaultTagService implements TagService
{
    private readonly _db: firebase.firestore.Firestore;
    
    
    public constructor()
    {
        const firebaseConfig = {
            // apiKey: process.env.API_KEY,
            // authDomain: process.env.AUTH_DOMAIN,
            // projectId: process.env.PROJECT_ID,
            // storageBucket: process.env.STORAGE_BUCKET,
            // appId: process.env.APP_ID,
            // measurementId: process.env.MEASUREMENT_ID,
            apiKey: "AIzaSyC45RUtQuCAQm0PBJPfCIfbfcOlFo8xkCU",
            authDomain: "project-st-b1b27.firebaseapp.com",
            projectId: "project-st-b1b27",
            storageBucket: "project-st-b1b27.appspot.com",
            messagingSenderId: "39093334369",
            appId: "1:39093334369:web:3f68b569825c1accdb1520",
            measurementId: "G-J4RQQP0F9S"
        };
        
        firebase.initializeApp(firebaseConfig);
        
        this._db = firebase.firestore();
    }
    
    
    public async createTag(productName: string, companyName: string, imageUrl:
        ReadonlyArray<string>, ownerName: string): Promise<Tag>
    {
        given(productName, "productName").ensureHasValue().ensureIsString();     
        given(companyName, "companyName").ensureHasValue().ensureIsString();
        given(imageUrl, "imageUrl").ensureIsArray();
        given(ownerName, "ownerName").ensureIsString();
        
        const newTag = new DefaultTagProxy(productName, companyName, imageUrl, ownerName);
        
        try
        {
            await this._db.collection("tags").doc(newTag.id).set({
                productName: newTag.productName,
                companyName: newTag.companyName,
                imageUrl: newTag.imageUrl,
                ownerName: newTag.ownerName,
            });
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
        
        return new DefaultTagProxy(tagData.productName, tagData.companyName, tagData.imageUrl, tagData.ownerName);
    }
}