window.onload = function() {
    if($('.hd_auto')[0]) {
        setImgHeight();
    } else {
        var hdAutoTimer = setInterval(function() {
            if($('.hd_auto')[0]) {
                setImgHeight();
                clearInterval(hdAutoTimer);
            }
        }, 500);
    }
};
window.addEventListener('resize', function (event) {
    setImgHeight();
});
function setImgHeight() {
    var is_hd_auto = document.getElementsByClassName('hd_auto').length;
    if(is_hd_auto > 0){
        var hptn1 = document.getElementsByClassName('hptn1')[0];
        if(hptn1)var background = hptn1.getAttribute("style");
        if(background){
            var is_img = background.match('url');
            // 画像が設定されてあるかどうか
            if(is_img){
                var img_url_str = is_img['input'].match(/url\(.+?\)/);
                var img_width_and_height = img_url_str[0].match(/(?!.+\/).+(?=\.)/);
                var img_width_str = img_width_and_height[0].match(/[\d]+/)[0];
                var img_height_str = img_width_and_height[0].match(/\_[\d]+/)[0];
                img_height_str = img_height_str.match(/[\d]+/)[0];
                var imgWidth = parseInt(img_width_str);
                var imgHeight = parseInt(img_height_str);
                var windowWidth = document.documentElement.clientWidth;
                if(windowWidth <= hptn1.clientWidth) {
                    var height = Math.floor(windowWidth * imgHeight / imgWidth);
                    hptn1.style.height = height + 'px';
                } else {
                    var height = Math.floor(hptn1.clientWidth * imgHeight / imgWidth);
                    hptn1.style.height = height + 'px';
                }
            }
        }
    }
}