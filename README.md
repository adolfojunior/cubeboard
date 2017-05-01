
Sample application using ElasticSearch and Kibana as backend services.

## Installation

First install https://www.docker.com/

From a terminal run:
```
git clone https://github.com/adolfojunior/cubeboard.git cubeboard
cd cubeboard
```

## Running all the services

Using `docker-compose` it will bootstrap all the services (ElasticSearch, Kibana, Sample App)

```
docker-compose up -d
```

## Importing data (salesman/products/sales)

This command will import to ES all the data needed

```
docker-compose run import python populate.py
```

## Test

Sample Application: http://localhost:3000

Kibana: http://localhost:8000

ElasticSearch: http://localhost:9200
