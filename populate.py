import json
import random
import httplib
import datetime

def format_date(dt):
    return dt.strftime("%Y-%m-%dT%H:%M:%S.%fZ")

def time_range(hours, minutes):
    for hour in range(hours):
        for minute in range(minutes):
            yield (hour, minute)

def datetime_range(hours, minutes):
    now = datetime.datetime.utcnow()
    delta = [datetime.timedelta(hours=t[0], minutes=t[1]) for t in time_range(hours, minutes)]
    return [format_date(now - d) for d in delta]

def push(path, data):
    headers = {"Content-type": "application/json"}
    conn = httplib.HTTPConnection("elasticsearch:9200")
    conn.request("POST", path, json.dumps(data), headers)
    response = conn.getresponse()
    return response.status

def populateSalesman():
    for id in range(1, 20):
        print push("/comp/vendedores/%s" % id, {
            "id": "v%s" % id,
            "name": "Salesman %s" % id
        })

def populateProducts():
    for id in range(1, 100):
        print push("/comp/produtos/%s" % id, {
            "id": "p%s" % id,
            "name": "Product %s" % id,
            "description": "Description %s" % id,
            "price": round(id + .99, 2)
        })

def populateSales():
    for date in datetime_range(1, 60):
        for i in range(1, random.randint(1, 10)):
            qtd = random.randint(1, 100)
            product = random.randint(1, 100)
            price = round(product + (product / 100.0), 2)
            discount = random.randint(1, 10)
            total = round(qtd * price * (1 - (discount / 100.0)), 2)
            data = {
                "salesman": "v1",
                "product": "p%s" % product,
                "price": price,
                "quantity": qtd,
                "total": total,
                "discount": discount,
                "sales_date": date
            }
            print push("/comp/vendas", data)

populateSalesman()
populateProducts()
populateSales()


