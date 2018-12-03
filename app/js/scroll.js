var limit = $(window).height()/3,
	var backTop = $('#back-top');
// при прокрутке окна (window)
// если пользователь прокрутил страницу более чем на 200px
 // то сделать кнопку scrollup видимой
$(window).scroll(function () {
	if ( $(this).scrollTop() > limit ) {
		backTop.fadeIn();
       // иначе скрыть кнопку scrollup
	} else {
		backTop.fadeOut();
	}
});

// scroll body to 0px on click
// при нажатии на кнопку scrollup
// переместиться в верхнюю часть страницы
backTop.click(function () {
	$('body,html').animate({
		scrollTop: 0
	}, 1500);
	return false;
});

