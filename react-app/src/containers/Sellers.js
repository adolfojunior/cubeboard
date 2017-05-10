import React from 'react'
import { Switch, Link, Route } from 'react-router-dom'

const SellersApi = {
  sellers: [1,2,3,4,5,6,7,8].map(id => ({
    id, name: `Seller ${id}`
  })),
  all() {
    return this.sellers
  },
  get(id) {
    return this.all().find(seller => seller.id === id)
  }
}

const SellerList = ({ match }) => (
  <div>
    <ul>
      {
        SellersApi.all().map(seller => (
          <li key={seller.id}>
            <Link to={`${match.url}/${seller.id}`}>{seller.name} {`${match.url}/${seller.id}`}</Link>
          </li>
        ))
      }
    </ul>
  </div>
)

const Seller = ({ match, backUrl }) => {
  const { params: { id } } = match
  const seller = SellersApi.get(parseInt(id, 10))
  if (!seller) {
    return <div>Sorry, but the seller was not found</div>
  }
  return (
    <div>
      <h1>{seller.name} (#{seller.id})</h1>
      <h2>Position: {seller.position}</h2>
      <Link to={backUrl}>Back</Link>
    </div>
  )
}

export default ({ match }) => (
  <Switch>
    <Route exact path={match.url} component={SellerList} />
    <Route path={`${match.url}/:id`} component={Seller} backUrl={match.url} />
  </Switch>
)
