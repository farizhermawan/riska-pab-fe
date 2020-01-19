import AppComponent from './components/app.component';
import HeaderComponent from './components/header.component';
import MainSidebarComponent from './components/main-sidebar.component';
import DashboardComponent from './components/dashboard.component';
import CallbackComponent from "./components/auth/callback.component";
import RoleComponent from "./components/user_management/role.component";
import RoleMemberComponent from "./components/user_management/role-member.component";
import PermissionComponent from "./components/user_management/permission.component";
import RolePermissionComponent from "./components/user_management/role-permission.component";

import angular = require("angular");

// module
let mod = angular.module('components', []);

mod.component('app', AppComponent.Factory());
mod.component('header', HeaderComponent.Factory());
mod.component('mainSidebar', MainSidebarComponent.Factory());
// pages
mod.component('dashboard', DashboardComponent.Factory());
mod.component('role', RoleComponent.Factory());
mod.component('roleMember', RoleMemberComponent.Factory());
mod.component('permission', PermissionComponent.Factory());
mod.component('rolePermission', RolePermissionComponent.Factory());
// other
mod.component('authCallback', CallbackComponent.Factory());

export default mod;
