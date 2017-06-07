import ProductsController from './ProductsController'

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
