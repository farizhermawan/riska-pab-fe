import Environment from "../constants/environment";

export default class AuthService {
  static API_URL = Environment.SERVICE_BASE_URL + "/v1";

  constructor(private $http, private $location, private alert) {
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
    this.alert.swal({
      title: "Portal Data RISKA",
      text: "Silahkan login menggunakan akun google anda.",
      type: "info",
      showCancelButton: false,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Sign in with Google"
    }, (isConfirm) => {
      if (isConfirm) window.location.href = AuthService.API_URL + '/auth/login';
      else window.close();
    });
  }

  logout() {
    this.$http.defaults.headers.common.Authorization = "";
    window.localStorage.clear();
    window.location.reload();
  }

  checkForAuthentication() {
    if (!this.isLoggedIn()) this.login();
    else this.setupHttpHeaderWithToken(this.getUserToken());
  }

  isLoggedIn() {
    return this.getCurrentUser() !== null;
  }

  getUserProfile(refetch = false, onSuccess, onError = null) {
    if (!refetch) onSuccess(this.isLoggedIn() ? this.getCurrentUser() : null);
    else this.fetchIdentity(this.getUserToken(), (result) => onSuccess(result), onError);
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

AuthService.$inject = ['$http', '$location', 'SweetAlert'];
