window.onload = function() {
    new Swiper(".swiper-container",{
        slidesPerView: 2,
		spaceBetween: 30,
        speed: 400,
        longSwipesMs: 200,
        loop: true,
        autoplay: {
        delay: 5000,
//        shortSwipes: true,
//            longSwipes: true,
//            longSwipesRatio: 0.5,
//            longSwipesMs: 2000,
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