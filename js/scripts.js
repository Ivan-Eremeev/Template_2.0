window.onload = function () {

  // Липкое меню.
  function stikyMenu(header) {
    let headerTop = header.offset().top;
    headerToggleClass();
    $(window).scroll(function () {
      headerToggleClass();
    });
    function headerToggleClass() {
      if ($(window).scrollTop() > headerTop + 150) {
        header.addClass('stiky');
      } else {
        header.removeClass('stiky');
      }
    }
  };
  stikyMenu($('#headerSticky'));

  // Swiper | Слайдер
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

  // Air Datepicker | Календарь
  new AirDatepicker('#airDatepicker', {
    position: 'right top',
  });

  // Magnific Popup | Попап окна
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

  // Sticky Sidebar | Липкий сайдбар
  if ($('.js-sticky').length) {
    var stickySidebar = new StickySidebar('.js-sticky', {
      topSpacing: 65,
      bottomSpacing: 10,
      containerSelector: false,
      innerWrapperSelector: '.sidebar__inner',
      resizeSensor: true,
      stickyClass: 'is-affixed',
      minWidth: 0
    });
  }

  // Кнопка скролла вверх страницы
  function scrollUp() {
    const btn = $('.js-scrollup');
    $(window).scroll(function () {
      btnShowFade();
    });
    function btnShowFade() {
      if ($(this).scrollTop() > 200) {
        btn.addClass('show');
      } else {
        btn.removeClass('show');
      }
    }
    btnShowFade();
    btn.click(function () {
      $('body,html').animate({
        scrollTop: 0
      }, 500);
      return false;
    });
  }
  scrollUp();

  // Показать еще в фильтрах
  function showMoreFilters() {
    const list = $('.js-more-list');
    const btn = $('.js-more-btn');
    const count = 4;
    list.each(function () {
      $(this).find('li').each(function (index) {
        if (index > count - 1) {
          $(this).fadeOut();
        }
      })
    })
    btn.on('click', function () {
      $(this).fadeOut();
      $(this).parent().find($('.js-more-list li')).fadeIn();
    })
  }
  showMoreFilters();

  // Очистить фильтр 
  function clearFilter() {
    let clearBnt = $('.js-filters-clear');
    clearBnt.on('click', function () {
      $(this).closest('.filters').find('input').prop('checked', false);
    })
  }
  clearFilter();

  // Изменение количества товара (плюс минус)
  function counter(block) {
    const counter = document.querySelectorAll(block);
    if (counter) {
      counter.forEach(element => {
        const minus = element.querySelector('.js-counter-minus');
        const plus = element.querySelector('.js-counter-plus');
        const inputWrap = element.querySelector('.js-counter-input');
        const input = inputWrap.querySelector('input');
        plus.addEventListener('click', () => {
          if (Number(input.value) < 999) {
            input.value = Number(input.value) + 1;
          }
        })
        minus.addEventListener('click', () => {
          if (Number(input.value) > 1) {
            input.value = Number(input.value) - 1;
          }
        })
        input.addEventListener('keyup', () => {
          input.value = input.value.replace(/[^\d]/g, '');
        })
        input.addEventListener('blur', () => {
          if (input.value == '' || input.value == 0) {
            input.value = 1;
          }
        })
      });
    }
  }
  counter('.js-counter');

}