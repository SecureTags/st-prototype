import { PageViewModel, route, template } from "@nivinjoseph/n-app";
import "./client-login-view.scss";
import { Routes } from "../routes";

@template(require("./client-login-view.html"))
@route(Routes.clientLogin)
export class ClientLoginViewModel extends PageViewModel
{
    
}