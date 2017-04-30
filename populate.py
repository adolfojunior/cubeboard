import json
import random
import httplib
import datetime

def format_date(dt):
    return dt.strftime("%Y-%m-%dT%H:%M:%S.%fZ")
    # return dt.strftime("%Y-%m-%d %H:%M:%S")

def time_range():
    for hour in range(0, 3):
        for minutes in range(0, 60):
            yield (hour, minutes)

def datetime_range():
    now = datetime.datetime.utcnow()
    delta = [datetime.timedelta(hours=t[0], minutes=t[1]) for t in time_range()]
    return [format_date(now - d) for d in delta]

def push(path, data):
    # print json.dumps(data)
    headers = {"Content-type": "application/json"}
    conn = httplib.HTTPConnection("elasticsearch:9200")
    conn.request("POST", path, json.dumps(data), headers)
    response = conn.getresponse()
    print response.status, response.reason
    return response.status is 200

def populateSales():
    for date in datetime_range():
        for i in range(1, random.randint(1, 10)):
            qtd = random.randint(1, 100)
            product = random.randint(1, 100)
            price = round(product + (product / 100.0), 2)
            discount = random.randint(1, 10)
            total = round(qtd * price * (1 - (discount / 100.0)), 2)
            data = {
                "product": "p%s" % product,
                "price": price,
                "qtd": qtd,
                "total": total,
                "discount": discount,
                "sales_date": date
            }
            push("/comp/vendas", data)

def populateSalesman():
    for id in range(1, 20):
        push("/comp/vendedores/%s" % id, {
            "id": "v%s" % id,
            "name": "Salesman %s" % id
        })

def populateProducts():
    for id in range(1, 100):
        push("/comp/produtos/%s" % id, {
            "id": "p%s" % id,
            "name": "Product %s" % id,
            "description": "Description %s" % id,
            "price": round(id + .99, 2)
        })

populateSalesman()
populateProducts()
