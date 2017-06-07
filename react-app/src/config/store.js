import createHistory from 'history/createBrowserHistory'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer } from 'react-router-redux'
import middlewares from './middlewares'
import * as reducers from '../reducers'

export default createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(...middlewares)
)
