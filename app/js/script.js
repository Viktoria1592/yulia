
var mapFrame = document.getElementById('map');
if (mapFrame) {
    ymaps.ready(initMap)
};

function initMap() {
    var myMap;
    myMap = new ymaps.Map("map", {
        center: [59.938816, 30.323244]
        , zoom: 16
        , controls: []
    });
    myMap.behaviors.disable('scrollZoom');
    myMap.controls.add("zoomControl", {
        position: {
            top: 15
            , left: 15
        }
    });
    var myPlacemark = new ymaps.Placemark([59.938816, 30.323244], {}, {
        iconLayout: 'default#image'
        , iconImageHref: ('../img/ser-4.png')
        , iconImageSize: [218, 142]
        , iconImageOffset: [-20, -47]
    });
    myMap.geoObjects.add(myPlacemark);
};
$(document).ready(function(){
    $(".filter-button").click(function(){
        var value = $(this).attr('data-filter');
                if(value == "all")        {
            //$('.filter').removeClass('hidden');
            $('.filter').show('1000');
        }       else        {
//            $('.filter[filter-item="'+value+'"]').removeClass('hidden');//
          $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
            $(".filter").not('.'+value).hide('3000');
            $('.filter').filter('.'+value).show('3000');
        }
    });
   if ($(".filter-button").removeClass("active")) {
$(this).removeClass("active");
}
$(this).addClass("active");
});
$(document).ready(function(){
  $(".fancybox").fancybox({
        openEffect: "none",
        closeEffect: "none"
    });
    $(".zoom").hover(function(){
				$(this).addClass('transition');
	}, function(){
		$(this).removeClass('transition');
	});
});
		window.onload = function() {
    new Swiper(".swiper-container",{
        slidesPerView: 3,
		spaceBetween: 30,
        speed: 400,
        pagination: {
            el: ".swiper-pagination",
			clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        breakpoints: {
			767: {
      slidesPerView: 2,
      spaceBetween: 30
    },
			559: {
      slidesPerView: 1,
      spaceBetween: 20
    },
		}
    })
}
;

