import angular = require("angular");
import components from './components';
import directives from './directives';
import services from './services';
import config from './config';
import run from "./run";

let app = angular.module('angular-admin-lte', [
  'ui.router',
  'oi.select',
  'ngInputCurrency',
  'oitozero.ngSweetAlert',
  'moment-picker',
  'ngSanitize',
  'ngCookies',
  'angularjs-input-file',
  'ngStorage'
]);

app.config(config);

app.run(run);

angular.bootstrap(document.body, [app.name, components.name, directives.name, services.name], {
  strictDi: true
});
