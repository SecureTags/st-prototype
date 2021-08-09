import { CustomNavbarViewModel } from "./custom-navbar/custom-navbar-view-model";
import { CustomUserFooterViewModel } from "./custom-user-footer/custom-user-footer-view-model";
import { CustomUserNavbarViewModel } from "./custom-user-navbar/custom-user-navbar-view-model";
import { ShellViewModel } from "./shell/shell-view-model";


export const components: Array<Function> = [
    ShellViewModel,
    CustomNavbarViewModel,
    CustomUserNavbarViewModel,
    CustomUserFooterViewModel
];