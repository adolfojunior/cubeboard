import React from 'react'
import { Switch, Link, Route } from 'react-router-dom'

// A simple data API that will be used to get the data for our
// components. On a real website, a more robust data fetching
// solution would be more appropriate.
const ProductsApi = {
  products: [1,2,3,4,5,6,7,8].map(id => ({
    id, name: `Product ${id}`
  })),
  all() {
    return this.products
  },
  get(id) {
    return this.all().find(product => product.id === id)
  }
}

const ProductList = () => (
  <div>
    <ul>
      {
        ProductsApi.all().map(product => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))
      }
    </ul>
  </div>
)

const Product = ({ match: { params: { id } } }) => {
  const product = ProductsApi.get(parseInt(id, 10))
  if (!product) {
    return <div>Sorry, but the product was not found</div>
  }
  return (
    <div>
      <h1>{product.name} (#{product.id})</h1>
      <h2>Position: {product.position}</h2>
      <Link to='/products'>Back</Link>
    </div>
  )
}

// The Roster component matches one of two different routes
// depending on the full pathname
const Products = () => (
  <Switch>
    <Route exact path='/products' component={ProductList}/>
    <Route path='/products/:id' component={Product}/>
  </Switch>
)

export default Products
