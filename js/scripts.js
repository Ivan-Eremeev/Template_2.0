window.onload = function () {

  // Swiper
  if ($('#swiper').length) {
    const swiper = new Swiper('#swiper', {
      // Optional parameters

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
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

}