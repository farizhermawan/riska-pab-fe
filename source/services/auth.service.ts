import Constant from "../classes/constant";

export default class AuthService {
  static API_URL = Constant.SERVICE_BASE_URL;

  constructor(private $http, private $location, private $storage, private $q) {
  }

  callbackAuth(onError) {
    let _this = this;
    this.$http.get(AuthService.API_URL + '/auth/callback', {params: this.$location.search()}).then(function (response) {

      _this.setupHttpHeaderWithToken(response.data.access_token);

      let getProfile = _this.$http.get(AuthService.API_URL + '/auth/me');

      _this.$q.all([getProfile]).then(result => {
        if (!Array.isArray(result)) onError();
        else {
          _this.$storage.currentUser = {
            profile: result[0].data,
            permission: [], // TODO api to list permission
            token: response.data.access_token
          };
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
    this.$storage.$reset();
    this.$http.defaults.headers.common.Authorization = "";
    this.login();
  }

  checkForAuthentication() {
    if (!this.isLoggedIn()) this.login();
    else this.setupHttpHeaderWithToken(this.$storage.currentUser.token);
  }

  isLoggedIn() {
    return typeof this.$storage.currentUser !== 'undefined';
  }

  getUserProfile() {
    return this.isLoggedIn() ? this.$storage.currentUser.profile : null;
  }

  getUserToken() {
    return this.isLoggedIn() ? this.$storage.currentUser.token : null;
  }

  setupHttpHeaderWithToken(token) {
    this.$http.defaults.headers.common.Authorization = 'Bearer ' + token;
  }
}

AuthService.$inject = ['$http', '$location', '$sessionStorage', '$q'];
