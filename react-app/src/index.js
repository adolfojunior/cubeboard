import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import  { BrowserRouter } from 'react-router-dom'
import { Header } from './components'
import { Main } from './containers'

const content = (
  <BrowserRouter>
    <div>
      <Header />
      <Main />
    </div>
  </BrowserRouter>
)

ReactDOM.render(content, document.getElementById(`app`))
