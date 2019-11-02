import Constant from "../classes/constant";

export default class DataService {
  static API_URL = Constant.SERVICE_BASE_URL;

  constructor(private http) {
  }

  getAllDepartments(successCallback) {
    this.http.get(DataService.API_URL + '/departments').then(successCallback);
  }

  saveDepartment(param, successCallback) {
    if (param.id != null) this.http.put(DataService.API_URL + '/departments/' + param.id, param).then(successCallback);
    else this.http.post(DataService.API_URL + '/departments', param).then(successCallback);
  }

  removeDepartment(id, successCallback) {
    this.http.delete(DataService.API_URL + '/departments/' + id).then(successCallback);
  }
}

DataService.$inject = ['$http'];
