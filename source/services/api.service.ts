import Constant from "../classes/constant";

export default class APIService {
  static API_URL = Constant.SERVICE_BASE_URL + "/v1";

  constructor(private http) {
  }

  get(path, param = {}) {
    return this.http.get(APIService.API_URL + path, param);
  }

  post(path, param = {}) {
    return this.http.post(APIService.API_URL + path, param);
  }

  put(path, param = {}) {
    return this.http.put(APIService.API_URL + path, param);
  }

  delete(path, param = {}) {
    return this.http.delete(APIService.API_URL + path, param);
  }
}

APIService.$inject = ['$http'];
