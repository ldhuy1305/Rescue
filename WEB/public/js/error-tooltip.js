/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
var ErrorTooltip = (function () {
    var _optionsErrorTooltip = {
        xOffset: 100,
        yOffset: 0,
        tooltipId: 'has-tooltip-class',
        tooltipAttr: 'has-tooltip-message',
        styleError: 'item-error',
        parentOfItemError: 'have-error'
    };
    var _itemError = function (message, type) {
        try {
            return this.each(function (index, dom) {
                try {
                    message = (message ?? '') + '';
                    if (message !== '') {
                        var style = _optionsErrorTooltip.styleError;
                        if (!$(this).hasClass(style)) {
                            var typeErr = $(this).attr('type-err');
                            if (
                                !(
                                    typeErr == undefined ||
                                    typeErr == null ||
                                    typeErr == ''
                                )
                            ) {
                                type = typeErr;
                            } else {
                                type = (type ?? '') + '';
                            }
                            $(this).addClass(style);
                            $(this).css({
                                border: 'solid 1px #d9534f'
                            });
                            if (type === '') {
                                $(this).AddTooltip(message);
                                console.log(1);
                            } else {
                                var parent = $(this).parents(
                                    '.' + _optionsErrorTooltip.parentOfItemError
                                );
                                if (parent.length > 0) {
                                    parent.find('span.invalid').remove();
                                    parent.append(
                                        '<span class="invalid">' +
                                            message +
                                            '</span>'
                                    );
                                }
                            }
                        }
                    }
                } catch (e) {
                    console.log('ItemError: ' + e.message);
                    return false;
                }
            });
        } catch (e) {
            console.log('ItemError: ' + e.message);
            return this.each(function (index, dom) {});
        }
    };
    var _addTooltip = function (message) {
        try {
            return this.each(function (index, dom) {
                try {
                    $(this)
                        .attr(_optionsErrorTooltip.tooltipAttr, message)
                        .mouseover(function (event) {
                            _tooltipMouseover(event, $(this));
                        })
                        .focus(function (event) {
                            _tooltipMouseover(event, $(this));
                        })
                        .mouseout(function (event) {
                            _tooltipMouseout(event, $(this));
                        })
                        .blur(function (event) {
                            _tooltipMouseout(event, $(this));
                        })
                        .change(function (event) {
                            _clearError(event, $(this));
                        });
                } catch (e) {
                    console.log('AddTooltip' + e.message);
                    return false;
                }
            });
        } catch (e) {
            console.log('AddTooltip' + e.message);
            return this.each(function (index, dom) {});
        }
    };

    var _removeError = function () {
        try {
            return this.each(function (index, dom) {
                try {
                    $(this)
                        .removeAttr(_optionsErrorTooltip.tooltipAttr)
                        .unbind('mouseover', _tooltipMouseover)
                        .unbind('focus', _tooltipMouseover)
                        .unbind('mouseout', _tooltipMouseout)
                        .unbind('blur', _tooltipMouseout)
                        .unbind('change', _clearError);
                    $(this).css({
                        border: ''
                    });
                    $(this).removeClass(_optionsErrorTooltip.styleError);
                    $(this)
                        .parent()
                        .find('.' + _optionsErrorTooltip.tooltipId)
                        .remove();
                    $(this).parent().css({
                        position: ''
                    });
                    var parent = $(this).parents(
                        '.' + _optionsErrorTooltip.parentOfItemError
                    );
                    if (parent.length > 0) {
                        parent.find('.msg-err').remove();
                    }
                } catch (e) {
                    console.log('RemoveToolTip: ' + e.message);
                    return false;
                }
            });
        } catch (e) {
            console.log('RemoveToolTip: ' + e.message);
            return this.each(function (index, dom) {});
        }
    };

    var _clearError = function (event, object) {
        object.RemoveError();
    };

    var _tooltipMouseover = function (event, object) {
        try {
            var $parent = $(object).parent();
            if ($('.' + _optionsErrorTooltip.tooltipId).length > 0) {
                $('.' + _optionsErrorTooltip.tooltipId).remove();
            }
            var tooltipMessage =
                (object.attr(_optionsErrorTooltip.tooltipAttr) ?? '') + '';
            if (tooltipMessage !== '') {
                $parent.css({
                    position: 'relative'
                });
                var $tooltip = $(
                    '<p class="' +
                        _optionsErrorTooltip.tooltipId +
                        '"><span class="arrow"></span>' +
                        tooltipMessage +
                        '</p>'
                );
                var paddingLeft = $parent.css('padding-left');
                $tooltip.css({
                    left: paddingLeft + 'px',
                    position: 'absolute',
                    'z-index': '5',
                    color: '#E04141',
                    padding: '3px 10px',
                    'border-radius': '3px 4px 4px 3px',
                    border: 'solid 1px #E04141',
                    'min-width': '100px',
                    'background-color': '#FFFF',
                    'white-space': 'nowrap',
                    'font-size': '12px',
                    margin: '0 0 5px'
                });
                $tooltip.find('.arrow').css({
                    'border-top': '5px solid #CE5454',
                    'border-right': '5px solid transparent',
                    'border-left': '5px solid transparent',
                    content: '""',
                    height: '0',
                    left: '10px',
                    position: 'absolute',
                    bottom: '-5px',
                    width: '0'
                });
                $parent.append($tooltip);
                var height = $tooltip.outerHeight();
                $tooltip.css({
                    top: 0 - height - 5 + 'px'
                });
                if ($(object).is('[type="radio"]')) {
                    $tooltip.css({
                        left: '-7px',
                        top: 0 - height - 2 + 'px'
                    });
                }
                if (
                    $(object).closest('tr').length > 0 &&
                    $(object).closest('tr').is(':first-child')
                ) {
                    $tooltip.css({
                        top: 'unset',
                        bottom: 0 - height - 9 + 'px'
                    });
                    $tooltip.find('.arrow').css({
                        'border-bottom': '5px solid #CE5454',
                        'border-right': '5px solid transparent',
                        'border-left': '5px solid transparent',
                        'border-top': '5px solid transparent',
                        bottom: 'unset',
                        top: '-10px'
                    });
                    if ($(object).is('[type="radio"]')) {
                        $tooltip.css({
                            top: 'unset',
                            bottom: 0 - height - 6 + 'px'
                        });
                    }
                }
                $($tooltip, $parent).fadeIn(200, null);
            }
        } catch (e) {
            console.log('_tooltipMouseover: ' + e.message);
        }
    };

    var _tooltipMouseout = function (event, object) {
        try {
            var isFocus = $(object).is(':focus');
            if (!isFocus) {
                $(object)
                    .parent()
                    .find('.' + _optionsErrorTooltip.tooltipId)
                    .remove();
            }
        } catch (e) {
            console.log('_tooltipMouseout: ' + e.message);
        }
    };

    var InitItemError = function () {
        $.fn.ItemError = _itemError;
        $.fn.AddTooltip = _addTooltip;
        $.fn.RemoveError = _removeError;
    };

    return {
        InitItemError: InitItemError,
        TooltipMouseover: _tooltipMouseover,
        TOOLTIP_ID: _optionsErrorTooltip.tooltipId,
        TOOLTIP_ATTR: _optionsErrorTooltip.tooltipAttr,
        STYLE_ERROR: _optionsErrorTooltip.styleError
    };
})();

ErrorTooltip.InitItemError();
