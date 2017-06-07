export class ProductService {
  constructor() {
    this.seq = 1
    this.products = {}
  }

  async get(id) {
    const product = this.products[id]
    return await (
      product ?
      Promise.resolve(product) :
      Promise.reject(new Error(`${id} not found`))
    )
  }

  async save(product) {
    const id = this.seq++
    const value = {...product, id}
    this.products[id] = value
    return await Promise.resolve(value)
  }

  async delete(id) {
    const product = this.products[id]
    if (product) {
      delete this.products[id]
      return await Promise.resolve(product)
    }
    return await Promise.reject(new Error(`${id} not found`))
  }
}

export default new ProductService()
