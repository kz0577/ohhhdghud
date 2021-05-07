$(function() {
    function isSmartPhone() {
        if(navigator.userAgent.match('.*iPhone.*') || navigator.userAgent.match('.*Android.*Mobile.*')){
            return true;
        }else{
            return false;
        }
    }

    var snsUrls = {
        twitter: "http://twitter.com/share?",
        facebook: "http://www.facebook.com/share.php?",
        google: "https://plus.google.com/share?",
        line: {
            sm: "line://msg/text/",
            pc: "http://line.me/R/msg/text/?"
        }
    };

    function getTwitterUrl() {
	return snsUrls.twitter + 'text=' + encodeURIComponent(document.title) + '&url=' + encodeURIComponent(location.href);
    }

    function getFacebookUrl() {
        return snsUrls.facebook + 'u=' + encodeURIComponent(location.href);
    }

    function getGoogleUrl() {
        return snsUrls.google + 'url=' + encodeURIComponent(location.href);
    }

    function getLineUrl() {
        if(isSmartPhone()) {
            return snsUrls.line.sm + encodeURIComponent(document.title + ' ' + location.href);
        } else {
            return snsUrls.line.pc + encodeURIComponent(document.title + ' ' + location.href);
        }
    }

    $('.snstable a').click(function(e) {
        var sns = $(this).data('sns');
        var url = '';
        var href = $(this).attr('href');

        if(href == '#'){ // hrefが'#'のときはシェアボタン。
            switch(sns) {
                case 'twitter':
                    url = getTwitterUrl();
                    break;
                case 'facebook':
                    url = getFacebookUrl();
                    break;
                case 'google':
                    url = getGoogleUrl();
                    break;
                case 'line':
                    url = getLineUrl();
                    break;
                default:
                    break;
            }

            if(url.match('^https?://')) {
                window.open(url);
            } else {
                location.href = url;
            }

            e.preventDefault();
        }
    });
});
