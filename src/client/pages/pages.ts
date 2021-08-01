import { ClientLoginViewModel } from "./client-login/client-login-view-model";
import { ClientRegisterViewModel } from "./client-register/client-register-view-model";

export const pages: Array<Function> = [
    ClientLoginViewModel,
    ClientRegisterViewModel
];