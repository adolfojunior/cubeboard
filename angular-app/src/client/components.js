angular.module('ui.sales').component('appNavbar', {
  templateUrl: '/components/app-navbar.html',
  controller: function AppNavbarController() {
  },
  bindings: {
    hero: '='
  }
})

angular.module('ui.sales').component('productsList', {
  templateUrl: '/views/products-list.html',
  controller: function ProductListController(productService) {
    var ctrl = this
    ctrl.products = []
    ctrl.list = function() {
      productService.list().then(function(products){
        ctrl.products = products
      })
    }
    // init
    ctrl.list()
  },
  bindings: {
    hero: '='
  }
})

angular.module('ui.sales').component('sellersList', {
  templateUrl: '/views/sellers-list.html',
  controller: function SellerListController(sellerService) {
    var ctrl = angular.extend(this, {
      sellers: [],
      list: list = function() {
        sellerService.list().then(function(sellers){
          ctrl.sellers = sellers
        })
      }
    })
    // init
    ctrl.list()
  },
  bindings: {
    hero: '='
  }
})

angular.module('ui.sales').component('salesList', {
  templateUrl: '/views/sales-list.html',
  controller: function ProductListController($state, salesService) {
    var ctrl = this
    ctrl.sales = []
    ctrl.list = function() {
      salesService.list().then(function(sales){
        ctrl.sales = sales
      })
    }
    ctrl.create = function() {
      $state.go('sales-form')
    }
    // init
    ctrl.list()
  },
  bindings: {
    hero: '='
  }
})

angular.module('ui.sales').component('salesForm', {
  templateUrl: '/views/sales-form.html',
  controller: function SalesFormController($state, $scope, salesService) {
    var ctrl = angular.extend(this, {
      sale: {},
      save: function() {
        // $state.go('sales-list')
      },
      form: function(field) {
        var form = $scope.sales_form
        return field ? form[field] : form
      }
    })
  },
  bindings: {
    hero: '='
  }
})

app.directive("controlGroup", function () {
  return {
    template:
      '<div class="control-group" ng-class="{ error: isError }">\
          <label class="control-label" for="{{for}}">{{label}}</label>\
          <div class="controls" ng-transclude></div>\
      </div>',

    replace: true,
    transclude: true,
    require: "^form",

    scope: {
        label: "@" // Gets the string contents of the `label` attribute
    },

    link: function (scope, element, attrs, formController) {
      var input = element.find(":input")
      // The <label> should have a `for` attribute that links it to the input.
      // Get the `id` attribute from the input element
      // and add it to the scope so our template can access it.
      var id = input.attr("id")
      scope.for = id

      // Get the `name` attribute of the input
      var name = input.attr("name")
      // Build the scope expression that contains the validation status.
      // e.g. "form.example.$invalid"
      var errorExpression = [formController.$name, name, "$invalid"].join(".")
      // Watch the parent scope, because current scope is isolated.
      scope.$parent.$watch(errorExpression, function (isError) {
          scope.isError = isError;
      })
    }
  };
});