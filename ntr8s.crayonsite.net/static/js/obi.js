$(function() {
	$('#obiRighter').click(function() {
		var righter = document.getElementById("obiRighter");
		var perolist = document.getElementById("obinav");

		if(righter.classList.contains('s-oviHeadRighterOn') == false){
			righter.classList.add("s-oviHeadRighterOn");
			perolist.style.overflow = "auto";
			perolist.style.height = "auto";
		} else {
			righter.classList.remove("s-oviHeadRighterOn");
			perolist.style.overflow = "hidden";
			perolist.style.height = "36px";
			perolist.scrollTop = 0;
		}

		event.preventDefault();
	});

	if($('#obinav li')[0]) {
        dispObiRighter(true);
	} else {
        var obiTimer = setInterval(function() {
            if($('#obinav li')[0]) {
                dispObiRighter(true);
                clearInterval(obiTimer);
            }
        }, 500);
	}

    $(window).resize(function() {
        if($('#obinav li')[0]) dispObiRighter();
    });

    function dispObiRighter(fadeOption) {
        if($('#obinav li').filter(':first').offset().top != $('#obinav li').filter(':last').offset().top) {
            if(fadeOption) {
                $('#obiRighter').fadeIn();
            } else {
                $('#obiRighter').show();
            }
        } else {
            $('#obiRighter').hide();
        }
    }
});


