import { ClientLoginViewModel } from "./client-login/client-login-view-model";
import { ClientRegisterViewModel } from "./client-register/client-register-view-model";
import { ClientTagCreationViewModel } from "./client-tag-creation/client-tag-creation-view-model";
import { UserTagViewModel } from "./user-tag/user-tag-view-model";

export const pages: Array<Function> = [
    ClientLoginViewModel,
    ClientRegisterViewModel,
    ClientTagCreationViewModel,
    UserTagViewModel
];