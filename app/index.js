const express = require('express')
const proxy = require('express-http-proxy');

const PORT = process.env.PORT || 3000
const ELASTICSEARCH = process.env.ELASTICSEARCH || `elasticsearch:9200`

const app = express()
const static = express.static(`public`)

app.use(`/es`, proxy(ELASTICSEARCH))
app.use(`/`, static)
app.use(`*`, static)

app.listen(PORT, () => {
  console.log(`# app on port ${PORT}`)
  console.log(`# elasticsearch: ${ELASTICSEARCH}`)
})
