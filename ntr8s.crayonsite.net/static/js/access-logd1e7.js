$(function(){
    var ACCESS_LOG_API_URL = CMS_API_URL + '/ajax/access-log/';
    $.ajax({
        url: ACCESS_LOG_API_URL,
        type: "POST",
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        data: {user_agent: navigator.userAgent,referrer: document.referrer,path: location.pathname,shop_id: SHOP_ID}
    });
});
