import ProductsController from './products.controller.js'

/* @ngInject */
function route($stateProvider) {
  $stateProvider.state('products', {
      url: '/products.html',
      template: require('./products.html'),
      controller: ProductsController,
      controllerAs: 'ctrl'
    })
}

export default route