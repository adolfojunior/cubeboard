import HomeController from './HomeController'

/* @ngInject */
export default function route($stateProvider) {
  $stateProvider.state('home', {
    url: '/',
    template: require('./home.html'),
    controller: HomeController,
    controllerAs: 'ctrl'
  })
}
