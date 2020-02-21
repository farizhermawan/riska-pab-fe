export default class Environment {

  static SERVICE_BASE_URL = window.location.hostname === 'portal.riska.or.id'
    ? "https://api-portal.riska.or.id"
    : "http://localhost:8000";
}
