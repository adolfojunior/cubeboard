import angular from 'angular'
import uirouter from '@uirouter/angularjs'

import routes from './routes'

export default angular
    .module('app.home', [uirouter])
    .config(routes)
    .name