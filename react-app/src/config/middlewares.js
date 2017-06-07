import promiseMiddleware from 'redux-promise'
import { routerMiddleware } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import history from './history'

const middlewares = [
  promiseMiddleware,
  routerMiddleware(history)
]

if (process.env.NODE_ENV === `development`) {
  middlewares.push(createLogger())
}

export default middlewares
