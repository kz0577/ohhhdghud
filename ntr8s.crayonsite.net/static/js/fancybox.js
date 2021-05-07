$(document).ready(function() {
  setFancyboxGroup();
  $('[data-fancybox]').fancybox({
    loop: true,
    buttons : [
        'thumbs',
        'close'
    ],
    transitionEffect : 'slide',
    errorTpl : '<div class="fancybox-error"><p>Not Data</p></div>',
    mobile : {
        clickSlide : function( current, event ) {
            return 'close'
        }
    },
    touch : {
        vertical : false
    },
    hideScrollbar: false,
  });
});
function setFancyboxGroup() {
  // スライドショーパーツの画像をパーツ毎にグループ化
  for(var i=0; i<$('.gslide_area').length; i++) {
    $('.gslide_area').eq(i).find('li.slick-slide:not(".slick-cloned")').find('a').attr('data-fancybox', 'gslide'+i);
  }
  // 商品一覧パーツの画像をパーツ毎にグループ化
  for(var i=0; i<$('.shopItem').length; i++) {
    $('.shopItem').eq(i).find('div.slick-slide:not(".slick-cloned")').find('a').attr('data-fancybox', 'shopItem'+i);
  }
}
