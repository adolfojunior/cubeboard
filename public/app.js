
/*
 * Float Alerts
 */
function floatAlert(type, message, timeout) {
    if ($('#float-alert').length == 0) {
      $('<div id="float-alert"></div>').appendTo('body')
    }
    var id = 'float-alert-' + (floatAlert.index++)
    var html = [
        '<div id="', id, '" class="alert alert-', type, ' fade in">',
            '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>',
            message,
            '&nbsp;&nbsp;',
        '</div>'
    ]
    // add it
    $(html.join('')).appendTo('#float-alert')
    // close it
    setTimeout(function () {
        $('#' + id).alert('close')
    }, timeout || 3000);
}
floatAlert.index = 0
floatAlert.ok = function(m, t){floatAlert('success', m, t)}
floatAlert.error = function(m, t){floatAlert('danger', m, t)}
floatAlert.warn = function(m, t){floatAlert('warning', m, t)}
floatAlert.info = function(m, t){floatAlert('info', m, t)}

/*
 * Validation
 */
var CODE_VALIDATOR = function(str) {
    return /^\w+$/.test(str || '')
}
var DECIMAL_VALIDATOR = function(str) { return /^\d+(\.\d+)?$/.test(str) }
var INTEGER_VALIDATOR = function(str) { return /^\d+?/.test(str) }
var DATE_VALIDATOR = function(str) { return moment(str, 'DD/MM/YYYY').isValid() }
var TIME_VALIDATOR = function(str) { return moment(str, 'HH:mm').isValid() }

function isFormValid(form) {
    return ! $(form).find('.form-group').hasClass('has-error')
}

function validateAndGetInput(selector, validator, defaultValue) {
    var input = $(selector)
    var value = $.trim(input.val()) || defaultValue
    var valid = validator ? validator(value) : value !== undefined
    var group = input.closest('.form-group')
    if (valid) {
        group.removeClass('has-error')
        group.addClass('has-success')
    } else if (!group.hasClass('has-error')) {
        group.addClass('has-error')
    }
    return value
}

function saveSales(data) {
    return jQuery.ajax({
      url: '/es/comp/vendas',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    })
}

function findVendedores(query) {
    return jQuery.ajax({
      url: '/es/comp/vendedores/_search',
      type: 'GET',
      data: {q:(query||'') + '*'}
    })
}

function findVendas(query) {
    return jQuery.ajax({
      url: '/es/comp/vendas/_search',
      type: 'GET',
      data: {q:(query||'') + '*'}
    })
}

function findProdutos(query) {
    return jQuery.ajax({
      url: '/es/comp/produtos/_search',
      type: 'GET',
      data: {q:(query||'') + '*'}
    })
}


