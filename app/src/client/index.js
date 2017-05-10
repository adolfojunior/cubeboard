import 'bootstrap/dist/css/bootstrap.css'

import angular from 'angular'
import uirouter from '@uirouter/angularjs'
import config from './config'
import home from './home'
import products from './products'

angular
  .module('app', [
    uirouter,
    home,
    products
  ])
  .config(config)
