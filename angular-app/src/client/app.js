angular.module('ui.sales', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui.router'])

angular.module('ui.sales').config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('products-list', {
        url: '/products-list',
        template: '<products-list></products-list>'
    })
    .state('sellers-list', {
        url: '/sellers-list',
        template: '<sellers-list></sellers-list>'
    })
    .state('sales-list', {
        url: '/sales-list',
        template: '<sales-list></sales-list>'
    })
    .state('sales-form', {
        url: '/sales-form',
        template: '<sales-form></sales-form>'
    })

    $urlRouterProvider.otherwise('/sales-form')
})