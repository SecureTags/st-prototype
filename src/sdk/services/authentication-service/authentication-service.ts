export interface AuthenticationService
{
    signUp(email: string, password: string, firstName: string, lastName: string, profileImageUrl: Array<string>):
        Promise<void>;
    signIn(email: string, password: string): Promise<boolean>;
    signOut(): Promise<void>;
    getCurrentUserId(): string | null;
}