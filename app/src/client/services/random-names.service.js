import angular from 'angular';

/* @ngInject */
export class RandomNames {
  constructor() {
    this.names = ['John', 'Elisa', 'Mark', 'Annie'];
  }

  getName() {
    const totalNames = this.names.length;
    const rand = Math.floor(Math.random() * totalNames);
    return this.names[rand];
  }
}

export default angular
    .module('services', [])
    .service('randomNames', RandomNames)
    .name