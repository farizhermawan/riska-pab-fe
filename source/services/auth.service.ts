import Constant from "../classes/constant";

export default class AuthService {
  static API_URL = Constant.SERVICE_BASE_URL;

  constructor(private $http, private $location, private $q) {
  }

  callbackAuth(onError) {
    let _this = this;
    this.$http.get(AuthService.API_URL + '/auth/callback', {params: this.$location.search()}).then(function (response) {

      _this.setupHttpHeaderWithToken(response.data.access_token);

      let getProfile = _this.$http.get(AuthService.API_URL + '/auth/me');

      _this.$q.all([getProfile]).then(result => {
        if (!Array.isArray(result)) onError();
        else {
          let currentUser = {
            profile: result[0].data,
            permission: [], // TODO api to list permission
            token: response.data.access_token
          };
          _this.setCurrentUser(currentUser);
          window.location.href = '/';
        }
      });
    }, onError);
  }

  login() {
    let ref = this.$location.search()['ref'];
    window.location.href = ref == "login" ? AuthService.API_URL + '/auth/login' : '/login.html';
  }

  logout() {
    window.localStorage.clear();
    this.$http.defaults.headers.common.Authorization = "";
    this.login();
  }

  checkForAuthentication() {
    if (!this.isLoggedIn()) this.login();
    else this.setupHttpHeaderWithToken(this.getUserToken());
  }

  isLoggedIn() {
    return this.getCurrentUser() !== null;
  }

  getUserProfile() {
    return this.isLoggedIn() ? this.getCurrentUser().profile : null;
  }

  getUserToken() {
    return this.isLoggedIn() ? this.getCurrentUser().token : null;
  }

  setupHttpHeaderWithToken(token) {
    this.$http.defaults.headers.common.Authorization = 'Bearer ' + token;
  }

  setCurrentUser(data) {
    window.localStorage.setItem("currentUser", JSON.stringify(data));
  }

  getCurrentUser() {
    return JSON.parse(window.localStorage.getItem("currentUser"));
  }
}

AuthService.$inject = ['$http', '$location', '$q'];
