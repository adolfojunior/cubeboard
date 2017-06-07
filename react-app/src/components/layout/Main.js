import React from 'react'
import  { Switch, Route } from 'react-router-dom'
import SaleContainer from '../SaleContainer'

export default () => (
  <main className='container'>
    <Switch>
      <Route path='/sale' component={SaleContainer}/>
    </Switch>
  </main>
)
