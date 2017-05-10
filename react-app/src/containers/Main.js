import React from 'react'
import  {
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Home from './Home'
import Products from './Products'
import Sales from './Sales'
import Sellers from './Sellers'

export default () => (
  <main className='container'>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/sales' component={Sales}/>
      <Route path='/products' component={Products}/>
      <Route path='/sellers' component={Sellers}/>
    </Switch>
  </main>
)
