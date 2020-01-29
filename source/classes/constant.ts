export default class Constant {

  static SERVICE_BASE_URL = window.location.hostname === 'portal.riska.or.id'
    ? "https://portal.riska.or.id/service/api"
    : "http://localhost:8000/api";
}
