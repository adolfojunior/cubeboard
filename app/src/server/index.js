import express from 'express'
import proxy from 'express-http-proxy'

const PORT = process.env.PORT || 3000
const ELASTICSEARCH = process.env.ELASTICSEARCH || `elasticsearch:9200`

const app = express()
const client = express.static(`../client`)
const assets = express.static(`../public`)

app.use(`/es`, proxy(ELASTICSEARCH))
app.use(`/public`, assets)
app.use(`/`, client)
app.use(`*`, client)

app.listen(PORT, () => {
  console.log(`# app on port ${PORT}`)
  console.log(`# elasticsearch: ${ELASTICSEARCH}`)
})
