
Sample application using only ElasticSearch and Kibana

You will need Docker

## Running everything
```
docker-compose up -d
```

## Importing data (salesman/products)
```
docker-compose run import-es python populate.py
```

## Test

Sample Application: http://localhost:3000

Kibana: http://localhost:8000

ElasticSearch: http://localhost:9200
