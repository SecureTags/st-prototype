export class Routes
{
    public static readonly clientLogin = "/client-login";
    public static readonly clientRegister = "/client-register";
    public static readonly clientTagCreation = "/client-tag-creation";
    public static readonly userTag = "/user-tag?{id?:string}";
    
    public static readonly default = Routes.clientLogin;
}