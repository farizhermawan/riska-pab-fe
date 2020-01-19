import APIService from "./services/api.service";
import AuthService from "./services/auth.service";

import angular = require("angular");

let mod = angular.module('services', []);

mod.service('apiService', APIService);
mod.service('authService', AuthService);

export default mod;
