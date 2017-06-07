import './index.css'

import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import history from './config/history'
import store from './config/store'
import App from './components/layout/App'

const content = (
  <Provider store={store}>
    <Router history={history}>
      <App/>
    </Router>
  </Provider>
)

ReactDOM.render(content, document.getElementById(`app`))
