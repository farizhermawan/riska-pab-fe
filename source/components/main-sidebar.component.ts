export default class MainSidebarComponent {

  constructor(private $rootScope) {
  }

  static Factory() {
    return {
      controller: MainSidebarComponent,
      templateUrl: 'views/components/main-sidebar.html'
    };
  }
}

MainSidebarComponent.$inject = ['$rootScope'];