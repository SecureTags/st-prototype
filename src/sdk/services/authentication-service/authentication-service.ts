export interface AuthenticationService
{
    signUpNewUser(email: string, password: string, firstName: string, lastName: string, profileImageUrl: Array<string>):
        Promise<void>;
    signIn(email: string, password: string): Promise<void>;
}