import React from 'react'
import { Switch, Link, Route } from 'react-router-dom'

// A simple data API that will be used to get the data for our
// components. On a real website, a more robust data fetching
// solution would be more appropriate.
const SalesApi = {
  sales: [1,2,3,4,5,6,7,8].map(id => ({
    id, name: `Sale ${id}`
  })),
  all() {
    return this.sales
  },
  get(id) {
    return this.all().find(sale => sale.id === id)
  }
}

const SalesList = () => (
  <div>
    <ul>
      {
        SalesApi.all().map(sale => (
          <li key={sale.id}>
            <Link to={`/sales/${sale.id}`}>{sale.name}</Link>
          </li>
        ))
      }
    </ul>
  </div>
)

const Sale = ({ match: { params: { id } } }) => {
  const sale = SalesApi.get(parseInt(id, 10))
  if (!sale) {
    return <div>Sorry, but the sale was not found</div>
  }
  return (
    <div>
      <h1>{sale.name} (#{sale.id})</h1>
      <h2>Position: {sale.position}</h2>
      <Link to='/sales'>Back</Link>
    </div>
  )
}

// The Roster component matches one of two different routes
// depending on the full pathname
const Sales = () => (
  <Switch>
    <Route exact path='/sales' component={SalesList}/>
    <Route path='/sales/:id' component={Sale}/>
  </Switch>
)

export default Sales
