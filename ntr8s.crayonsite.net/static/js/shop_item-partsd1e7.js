$(function() {
    var BASE_CLASS = '.shopItem';
    var STOCK_API_URL = CMS_API_URL + '/shop-item/stock-exist/';
    var SHIPPING_API_URL = CMS_API_URL + '/shop-item/is-shipping-free/';
    var STOCK_CLASS = '.shopItemPostage';
    var init_flag = false;
    var INPUT_QTY_ELEM = '<div class="shopItemSu">数量：</div><input type="text" name="qty" value="10" maxlength="4">';
    
    function setAttrData(parts, id, callback) {
        $.post(STOCK_API_URL, {id: id}, function(data) {
            if(data === true) {
                parts.find('.shopItemStock').removeClass('hide');
                parts.find('.shopItemKagoLine').removeClass('hide');
                parts.find('.shopItemStockOut').addClass('hide');
            } else if(data === false) {
                parts.find('.shopItemStock').addClass('hide');
                parts.find('.shopItemKagoLine').addClass('hide');
                parts.find('.shopItemStockOut').removeClass('hide');
            }
            parts.find('input[name="item_id"]').val(id);
            if($.isFunction(callback)) callback();
        }, 'json').error(function(e) {
            console.log('api error');
        });
    }
    $(BASE_CLASS+' .shopItemKind a').on('click', function(e) {
        e.preventDefault();
        var parts = $(e.target).parents(BASE_CLASS);
        var _this = ($(e.target).attr('data-value')) ? $(e.target):$(e.target).parent('[data-value]');
        var id    = _this.attr('data-value');
        var price = _this.attr('data-price');
        setAttrData(parts, id, function() {
            parts.find('.shopItemKind .s-select').removeClass('s-select');
            _this.addClass('s-select');
            parts.find('.shopItemPrice2').text(price);
        });
        return false;
    });
    $(BASE_CLASS+' select[name="qty"]').on('change', function(e) {
        if($(e.target).val() == 10) {
           $(e.target).val(1); // init
           var input_elem = $(e.target).parent('.shopItemS')
               .html(INPUT_QTY_ELEM)
               .find('input[name="qty"]').focus()[0];
           if (input_elem.selectionStart != undefined) {
               input_elem.selectionStart = input_elem.selectionEnd = input_elem.value.length;
           } else {
               input_elem.createTextRange().select();
           }
        }
    });
    function initShopItem() {
        if(init_flag) return;
        init_flag = true;
        var id = $(BASE_CLASS).find('[name="shop_id"]:eq(0)').val();
        if(!id) return;
        
        $.post( SHIPPING_API_URL, {id:id}, function(data) {
            if(data === true) $(BASE_CLASS).find(STOCK_CLASS+':eq(0)').removeClass('hide');
            else if(data === false) $(BASE_CLASS).find(STOCK_CLASS+':eq(1)').removeClass('hide');
        }, 'json').error(function() {
            console.log('api error');
        });
        $(BASE_CLASS).each(function(idx, elem) {
            var id = $(elem).find('input[name="item_id"]').val();
            id = $(elem).find('.shopItemKind .s-select').attr('data-value') || id;
            setAttrData($(elem), id);
        });
    }
    initShopItem();
    window.onpageshow = function() { initShopItem() };
});
