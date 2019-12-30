import Constant from "../classes/constant";

export default class AuthService {
  static API_URL = Constant.SERVICE_BASE_URL + "/v1";

  constructor(private $http, private $location, private $q) {
  }

  callbackAuth(onSuccess, onError) {
    this.$http.get(AuthService.API_URL + '/auth/callback', {params: this.$location.search()})
        .then((response) => this.fetchIdentity(response.data.access_token, onSuccess, onError), onError);
  }

  fetchIdentity(access_token, onSuccess, onError = null) {
    this.setupHttpHeaderWithToken(access_token);

    let getProfile = this.$http.get(AuthService.API_URL + '/auth/me')
        .then((response) => {
          let currentUser = {
            profile: response.data.profile,
            permissions: response.data.permissions,
            roles: response.data.roles,
            token: access_token
          };
          this.setCurrentUser(currentUser);
          onSuccess(currentUser);
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

  getUserProfile(refetch = false, onSuccess, onError = null) {
    if (!refetch) onSuccess(this.isLoggedIn() ? this.getCurrentUser().profile : null);
    else this.fetchIdentity(this.getUserToken(), (result) => onSuccess(result.profile), onError);
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
