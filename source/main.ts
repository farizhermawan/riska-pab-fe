import * as angular from "angular";

import './vendor';
import './styles';
import './custom';

import components from './app/components';
import directives from './app/directives';
import services from './app/services';
import config from './app/config';
import run from "./app/run";

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
