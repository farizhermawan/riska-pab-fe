export default class DashboardComponent {

  protected user;

  constructor(private $rootScope) {
  }

  $onInit() {
    this.user = this.$rootScope.user;
  }

  static Factory() {
    return {
      controller: DashboardComponent,
      templateUrl: 'views/components/dashboard.html'
    };
  }
}

DashboardComponent.$inject = ['$rootScope'];
