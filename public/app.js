var form = (function($){

    function InputFormat(options) {
        $.extend(this, options, {
            parser: String,
            validate: function(value) {
                if (this.pattern) {
                    return this.pattern.test(value)
                }
                return true
            }
        })
    }

    function InputDateFormat(options) {
        InputFormat.call(this, $.extend(options, {
            parser: function(value) {
                return moment(value, this.format)
            },
            validate: function(value) {
                return this.parser(value).isValid()
            }
        }))
    }

    var formats = {
        CODE: new InputFormat({ pattern: /^\w+$/ }),
        DECIMAL: new InputFormat({ parser: parseFloat, pattern: /^\d+(\.\d+)?$/ }),
        INTEGER: new InputFormat({ parser: parseInt, pattern: /^\d+$/ }),
        DATE: new InputDateFormat({ format: 'DD/MM/YYYY' }),
        TIME: new InputDateFormat({ format: 'HH:mm' })
    }

    return {
        autoValidate: function(selector) {
            var form = this
            var update = function(){
                form.getValue(this)
            }
            $(selector).blur(update).change(update)
        },
        isValid: function(selector) {
            var el = $(selector)
            el = el.is('form') ? el.find('.form-group') : el.closest('.form-group')
            return ! el.hasClass('has-error')
        },
        getValue: function(selector) {
            var input = $(selector)
            var group = input.closest('.form-group')
            var value = $.trim(input.val())
            var format = formats[input.data('format')]

            var valid = true
            if (input.prop('required')) {
                valid = !!value
            }
            if (valid && format) {
                valid = format.validate(value)
                if (valid) {
                    value = format.parser(value)
                }
            }

            if (valid) {
                group.removeClass('has-error')
                group.addClass('has-success')
            } else if (!group.hasClass('has-error')) {
                group.addClass('has-error')
            }
            return value
        }
    }
})(jQuery)

var api = (function($){
    function _source(data) {
        return $.map(data.hits.hits, function(item) {
            return item._source
        })
    }
    function _search(path, query) {
        var url = '/es/'+ path +'/_search'
        var data = { q: (query || '') + '*' }
        return $.get(url, data).then(_source)
    }
    function _save(path, data) {
        var url = '/es/' + path
        return $.post({
          url: url,
          contentType: 'application/json',
          data: JSON.stringify(data)
        })
    }
    return {
        saveVendas: function(data) {
            return _save('comp/vendas', data)
        },
        findVendedores: function(query) {
            return _search('comp/vendedores', query)
        },
        findProdutos: function(query) {
            return _search('comp/produtos', query)
        },
        findVendas: function(query) {
            return _search('comp/vendas', query)
        }
    }
})(jQuery)

var app = (function($){
    return {
        page: function(path) {
            location.href = path
        },
        onload: function(onload) {
            $(document).ready(function(){
                onload.call(this, $)
            })
        },
        enableNav: function(navSelector) {
            $(navSelector).load('/parts/navbar.html')
        },
        enableSearch: function(searchSelector, search) {
            $(searchSelector).load('/parts/search.html', function() {
                $("#btn-search").click(function(e) {
                    search($("#search").val())
                })
                $("#search").on('keyup', function(e) {
                    if (e.keyCode === 13) {
                        search($("#search").val())
                    }
                })
            })
        },
        enableAutocomplete: function(selector, options) {
            var search = options.search
            var label = options.label || String
            var value = options.value || String
            var select = options.select || $.noop
            $(selector).autocomplete({
                minLength: 1,
                source: function(request, response) {
                    search(request.term).done(function(items){
                        response($.map(items, function(item){
                            return {
                                label: label(item),
                                value: value(item),
                                source: item
                            }
                        }))
                    })
                },
                select: function(event, ui) {
                    select(ui.item.source)
                }
            })
        }
    }
})(jQuery)

var alerts = (function($){

    var alertId = 1

    function createAlert(type, message, timeout) {
        if ($('#float-alert').length == 0) {
          $('<div id="float-alert"></div>').appendTo('body')
        }
        var id = 'float-alert-' + (alertId++)
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

    return {
        ok: function(m, t){ createAlert('success', m, t) },
        error: function(m, t){ createAlert('danger', m, t) },
        warn: function(m, t){ createAlert('warning', m, t) },
        info: function(m, t){ createAlert('info', m, t) }
    }
})(jQuery)