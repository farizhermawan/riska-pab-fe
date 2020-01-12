export default class DashboardComponent {

  constructor(private $rootScope) {
  }

  static Factory() {
    return {
      controller: DashboardComponent,
      templateUrl: 'views/components/dashboard.html'
    };
  }
}

DashboardComponent.$inject = ['$rootScope'];
