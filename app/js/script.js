
	$("#headerMenu").on("click","a", function (event) {
	    event.preventDefault();
	    var id  = $(this).attr('href'),
	        top = $(id).offset().top;
	    $('body,html').animate({scrollTop: top}, 1500);
	});
  $("#services").on("click","a", function (event) {
	    event.preventDefault();
	    var id  = $(this).attr('href'),
	        top = $(id).offset().top;
	    $('body,html').animate({scrollTop: top}, 1500);
	});
    $("#contacts").on("click","a", function (event) {
	    event.preventDefault();
	    var id  = $(this).attr('href'),
	        top = $(id).offset().top;
	    $('body,html').animate({scrollTop: top}, 1500);
	});


      window.onload = function() {
    new Swiper(".swiper-container",{
        slidesPerView: 2,
		spaceBetween: 30,
        speed: 400,
        autoplay: {
        delay: 5000,
        },
        pagination: {
            el: ".swiper-pagination",
			clickable: true,
        },
        navigation: {
            nextEl: ".button-next",
            prevEl: ".button-prev"
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




$(function () {
  $('#carousel').carousel({
    interval: 1000,
    keyboard: false,
    pause: 'false',
    ride: 'carousel',
    wrap: false
  });
});

