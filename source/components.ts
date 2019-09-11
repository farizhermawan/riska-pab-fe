import AppComponent from './components/app.component';
import HeaderComponent from './components/header.component';
import MainSidebarComponent from './components/main-sidebar.component';
// pages
import DashboardComponent from './components/dashboard.component';
import CallbackComponent from "./components/callback.component";
import DepartmentComponent from "./components/master_data/department.component";

// module
let mod = angular.module('components', []);

mod.component('app', AppComponent.Factory());
mod.component('header', HeaderComponent.Factory());
mod.component('mainSidebar', MainSidebarComponent.Factory());
// pages
mod.component('dashboard', DashboardComponent.Factory());
mod.component('department', DepartmentComponent.Factory());
// other
mod.component('loginCallback', CallbackComponent.Factory());

export default mod;