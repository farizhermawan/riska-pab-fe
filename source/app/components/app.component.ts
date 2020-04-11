const {version} = require('../../../package.json');

export default class AppComponent {
  version = version;
  buildVersion = new Date().toISOString().substr(0, 10);
  year = new Date().getFullYear();

  constructor(private $rootScope, $http) {
    $http.get("/build.txt").then((resp) => {
      this.buildVersion = resp.data;
    });
  }

  static Factory() {
    return {
      controller: AppComponent,
      templateUrl: 'views/components/app.html'
    };
  }
}

AppComponent.$inject = ['$rootScope', '$http'];
