import angular from 'angular'

/* @ngInject */
export default class ProductsController {
  constructor() {
    this.products = [{
      id: "1",
      name: "Product 1",
      description: "description 1",
      price: 1.99
    }]
  }
}
