$(document).ready(function() {
    // #3588: Colorbox browser back
    var open_hash = "#cbox-open"
    $(document).on('cbox_open', function(){
        location.hash = open_hash;
    });
    $(document).on('cbox_closed', function(){
        if(location.hash === open_hash) {
            history.back();
        }
    });
    $(window).on('hashchange', function(e) {
        if(location.hash != open_hash) {
            if('oldURL' in e.originalEvent) {
                // 無駄なclose処理を避けるためoldURLを判定
                if(e.originalEvent.oldURL.indexOf(open_hash) != -1) {
                    $.colorbox.close();
                }
            } else {
                // hashchangeイベントにoldURLがないブラウザ対策
                $.colorbox.close();
            }
        }
    });
});

$(document).ready(function() {
    // Contact Us
    var ua = window.navigator.userAgent;
    var absolute_mode = is_absolute_mode(ua);
    var ios10 = is_ios10(ua);
    var tmp_display_value = [];
    var top;
    var FRAME_LOAD_MESSAGE = 'cr-contactus-load';
    $(".contact_area a").colorbox({
        iframe:true,
        width:"90%",
        height:"95%",
        maxWidth:"800px",
        fixed:!absolute_mode,
        opacity:0.30,
        reposition:false,
        fastIframe:false,
        onLoad: function() {
            top = $(window).scrollTop();
        },
        onComplete: function() {
            var content_default_height = $('#colorbox #cboxLoadedContent').height();
            $('#colorbox .cboxIframe')
                .css('min-height', content_default_height)
                .height($('#colorbox .cboxIframe').height())
                .on('load', function() {
                    // iframe内のページ遷移を検知し、高さとiOSの場合はスクロール位置を再設定
                    $('#colorbox .cboxIframe').css('height', '100%').height( $('#colorbox .cboxIframe').height() );
                    $(window).scrollTop(0);
                });
            if(absolute_mode) absolute_mode_func();
        },
        onCleanup: function() {
            $(window).scrollTop(top).off("message.contactus");
        },
        onClosed: function() {
            if(absolute_mode) {
                $('body').children(':not("#colorbox,#cboxOverlay")').css('display', '');
                $.each(tmp_display_value, function(idx, obj) { $(obj[0]).css('display', obj[1]); });
            }
            $(window).scrollTop(top);
        },
    });

    function absolute_mode_func() {
        /* モーダル表示後サイトHTMLを隠し、後ろでスクロール不可にする */
        $('#colorbox,#cboxWrapper').css('overflow', 'visible').css('height', 'auto');
        $('#cboxWrapper').css('height', '100%');
        $('#colorbox').css('top', '0');
        $(window).scrollTop(0);
        // モーダル以外の要素を非表示
        var target = $('body').children(':not("#colorbox,#cboxOverlay")');
        tmp_display_value = [];
        $.each(target, function(idx, elem) {
            if( $(elem).attr('style') && $(elem).attr('style').indexOf('display') != -1) {
                tmp_display_value.push([elem, $(elem).css('display')]);
            }
        });
        target.css('display', 'none');
        if(ios10) {
            // #3580: iOS10の場合はモーダル内部を全表示
            $('#colorbox,#cboxWrapper,#cboxMiddleLeft,#cboxContent,#cboxLoadedContent').css('height', 'auto');
        }
    }
    function is_absolute_mode(ua) {
        return ( ua.indexOf("iPhone") != -1
              || ua.indexOf("iPad") != -1
              || ua.indexOf("Android") != -1
        );
    }
    function is_ios10(ua) {
        return ( ua.indexOf("iPhone OS 10") != -1 || ua.indexOf("iPad; CPU OS 10") != -1 );
    }
});
