import { handleActions } from 'redux-actions'
import {
  productActions,
  saleActions
} from '../actions'

export const product = handleActions({
  [productActions.product.list]: (state, { payload: list }) => {
    return { ...state, list }
  }
}, {
  list: []
})

export const sale = handleActions({
  [saleActions.sale.locate]: (state, { payload: location }) => {
    return { ...state, location }
  }
}, {
  // empty state
})
