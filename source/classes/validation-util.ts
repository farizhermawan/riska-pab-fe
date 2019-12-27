export default class ValidationUtil {

  public static isEmail(str) {
    var regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(str);
  }

  public static containSpecialChar(str) {
    var regExp = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    return regExp.test(str);
  }
}
