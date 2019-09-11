import DataService from "./services/data.service";

let mod = angular.module('services', []);

mod.service('dataService', DataService);

export default mod;