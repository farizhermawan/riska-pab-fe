import DataService from "./services/data.service";
import AuthService from "./services/auth.service";

let mod = angular.module('services', []);

mod.service('dataService', DataService);
mod.service('authService', AuthService);

export default mod;
