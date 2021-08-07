export class Routes
{
    public static readonly clientTagCreation = "/client-tag-creation";
    public static readonly userTag = "/user-tag?{id?:string}";
    public static readonly userLogin = "/user-login";
    public static readonly userRegister = "/user-register";
    public static readonly userDashboard = "/user-dashboard";
    
    public static readonly default = Routes.userLogin;
}