$(function() {
    slideShowAction();
    shopItemSlideAction();
});
function slideShowAction(target) {
    target = target || $('.gslide_area');
    target.each(function(idx, elem) {
        var obj = $(elem);
        var slide = obj.find('.slider');
        var arrows   = obj.find('.direction-item')[0] ? true : false
        var autoplay = ( parseInt(obj.attr('data-auto'), 10) > 0 );
        var autoplay_spped = parseInt( obj.attr('data-auto'), 10 );
        var dots = obj.find('.pager-item')[0] ? true : false
        if( slide.hasClass('slick-initialized') ) slide.slick('unslick');
        
        slide.slick({
            arrows: arrows,
            prevArrow    : obj.find('.prevmark'),
            nextArrow    : obj.find('.nextmark'),
            dots         : dots,
            appendDots   : obj.find('.pager-item'),
            autoplay     : autoplay,
            autoplaySpeed: autoplay_spped, 
        });
    });
};

function shopItemSlideAction(target) {
    target = target || $('.shopItem');
    target.each(function(idx, elem) {
        var obj = $(elem);
        var slide = obj.find('div.shopItemImagesFrame');
        var dots = obj.find('.pager-item')[0] ? true : false
        if( slide.hasClass('slick-initialized') ) slide.slick('unslick');
        
        slide.slick({
            arrows    : false,
            dots      : dots,
            appendDots: obj.find('.pager-item'),
        });
    });
};
