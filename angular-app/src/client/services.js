angular.module('ui.sales').service('salesService', function SalesService ($q, $http) {
this.list = function() {
    return $q(function(resolve, reject){
        var list = []
        for (var i = 1; i <= 10; i++) {
            list.push({
                id: i,
                name: "Product " + i,
                quantity: i,
                total: i * (i + .99)
            })
        }
        resolve(list)
    })
}
})

angular.module('ui.sales').service('productService', function ProductService ($q, $http) {
    this.list = function() {
        return $q(function(resolve, reject){
            var list = []
            for (var i = 1; i <= 10; i++) {
                list.push({
                    id: i,
                    name: "Product " + i,
                    description: "Description " + i,
                    price: i + .99
                })
            }
            resolve(list)
        })
    }
})

angular.module('ui.sales').service('sellerService', function SellerService ($q, $http) {
    this.list = function() {
        return $q(function(resolve, reject){
            var list = []
            for (var i = 1; i <= 10; i++) {
                list.push({
                    id: i,
                    name: "Salesman " + i
                })
            }
            resolve(list)
        })
    }
})
