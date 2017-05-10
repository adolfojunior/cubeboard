/* @ngInject */
function routing($locationProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true)
  $urlRouterProvider.otherwise('/')
}

export default routing
