import { UserService } from "./user-service";
import firebase from "firebase/app";
import "firebase/firestore";
import { given } from "@nivinjoseph/n-defensive";
import { User } from "../../proxies/user/user";

export class DefaultUserService implements UserService
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
    
    public async fetchUserData(userId: string): Promise<User>
    {
        given(userId, "userId").ensureHasValue().ensureIsString();
        
        try
        {
            const userData = (await this._db.collection("users").doc(userId).get()).data();
            
            if (userData)
                return {
                    id: userData.id,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    profileImageUrl: userData.profileImageUrl,
                };
            
            throw new Error("User Data is Undefined");
        }
        catch (e)
        {
            throw e;
        }
    }
}