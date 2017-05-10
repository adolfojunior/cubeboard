import HomeController from './home.controller.js'

/* @ngInject */
function route($stateProvider) {
  $stateProvider.state('home', {
      url: '/',
      template: require('./home.html'),
      controller: HomeController,
      controllerAs: 'ctrl'
    })
}

export default route