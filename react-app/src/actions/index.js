import { createActions } from 'redux-actions'
import {
  geolocationService,
  productService
} from '../services'

export const productActions = createActions({
  product: {
    async list() {
      return await productApi.list()
    }
  }
})

export const saleActions = createActions({
  sale: {
    async locate(address) {
      return await geolocationService.locate(address)
    }
  }
})
