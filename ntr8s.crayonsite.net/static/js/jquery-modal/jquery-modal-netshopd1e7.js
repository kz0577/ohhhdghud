$(function() {
    $('.ajax-shipping-info').click(function(event) {
        event.preventDefault();
        $.ajax({
            url: CMS_API_URL + this.getAttribute('href'),
            type: "GET",
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            success: function(html) {
                $(html).appendTo('body').modal();
            }
        });
    });
});
