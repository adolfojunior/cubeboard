import angular from 'angular'

/* @ngInject */
export default class HomeController {
  constructor() {
    this.name = 'World';
  }
  changeName() {
    this.name = 'angular-tips';
  }
}
