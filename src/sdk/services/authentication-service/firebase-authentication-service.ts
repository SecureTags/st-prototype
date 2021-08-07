import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { AuthenticationService } from "./authentication-service";

export class FirebaseAuthenticationService implements AuthenticationService
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
    
    
    public async signUpNewUser(email: string, password: string, firstName: string, lastName: string,
        profileImageUrl: string[]): Promise<void>
    {
        try
        {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            
            const user = firebase.auth().currentUser;
            
            if (user)
                await this._createNewUserInDb(user, firstName, lastName, profileImageUrl);
        }
        catch (e)
        {
            throw e;
        }
    }
    
    public async signIn(email: string, password: string): Promise<void>
    {
        try
        {
            console.log(email);
            console.log(JSON.stringify(await firebase.auth().signInWithEmailAndPassword(email, password)));
        }
        catch (e)
        {
            throw e;
        }
    }
    
    
    private async _createNewUserInDb(user: firebase.User, firstName: string, lastName: string,
        profileImageUrl: string[]): Promise<void>
    {
        try
        {
            await this._db.collection("users").doc(user.uid).set({
                firstName,
                lastName,
                profileImageUrl
            });
        }
        catch (e)
        {
            throw e;
        }
    }
}