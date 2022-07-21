window.onload = function () {

  // Swiper
  if ($('#swiper').length) {
    const swiper = new Swiper('#swiper', {
      // Optional parameters
      slidesPerView: 1,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }

  // Air Datepicker
  new AirDatepicker('#airDatepicker', {
    position: 'right top',
  });

  // Magnific Popup
  $('.open-popup-link').magnificPopup({
    mainClass: 'mfp-fade'
  });

  // Табы
	function tabs() {
    const tabs = $('.js-tabs');
		if (tabs.length) {
			tabs.each( function () {
        let triggers = $(this).find('.js-tabs-trigger');
        let contents = $(this).find('.js-tabs-content');
        let time = 300;
        triggers.on('click', function () {
          let trigger = $(this);
          let content = $('.js-tabs-content[data-href="' + trigger.attr('href') +'"]');
          if (!trigger.hasClass('active')) {
            triggers.removeClass('active');
            trigger.addClass('active');
            contents.hide();
            contents.removeClass('open');
            content.fadeIn(time, function () {
              $(this).addClass('open');
            });
          }else {
            return false;
          }
        })
      });
		}
	}
	tabs();

}