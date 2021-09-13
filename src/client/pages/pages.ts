import { ClientTagCreationViewModel } from "./client-tag-creation/client-tag-creation-view-model";
import { UserDashboardViewModel } from "./user-dashboard/user-dashboard-view-model";
import { UserLoginViewModel } from "./user-login/user-login-view-model";
import { UserRegisterViewModel } from "./user-register/user-register-view-model";
import { UserTagViewModel } from "./user-tag/user-tag-view-model";
import { UserEditTagViewModel } from "./user-edit-tag/user-edit-tag-view-model";

export const pages: Array<Function> = [
    ClientTagCreationViewModel,
    UserTagViewModel,
    UserLoginViewModel,
    UserRegisterViewModel,
    UserDashboardViewModel,
    UserEditTagViewModel
];