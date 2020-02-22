export default class Environment {

  static SERVICE_BASE_URL = window.location.hostname === 'localhost'
    ? "http://localhost:8000"
    : "https://portal.riska.or.id/api";
}
