window.onload = function () {

  // Липкое меню.
  function stikyMenu(header) {
    let headerTop = header.offset().top;
    headerToggleClass();
    $(window).scroll(function () {
      headerToggleClass();
    });
    function headerToggleClass() {
      if ($(window).scrollTop() > headerTop + 200) {
        header.addClass('sticky');
      } else if ($(window).scrollTop() <= headerTop) {
        header.removeClass('sticky');
      }
    }
  };
  stikyMenu($('#headerSticky'));

  // Мобильное меню
  function menuMobile() {
    let btn = $('.header__hamburger'),
        menu = $('.menu'),
        close = $('.menu__close'),
        body = $('body');
    btn.on('click', function () {
      let scrollWidth = (window.innerWidth - $(window).width());
      if (!btn.hasClass('is-active')) {
        btn.addClass('is-active');
        menu.addClass('open');
        body.addClass('lock').css('padding-right', scrollWidth);
      } else {
        btn.removeClass('is-active');
        menu.removeClass('open');
        body.removeClass('lock').css('padding-right', 0);
      }
      $(document).mouseup(function (e) {
        if (!btn.is(e.target)
          && btn.has(e.target).length === 0
          && !menu.is(e.target)
          && menu.has(e.target).length === 0) {
          btn.removeClass('is-active');
          menu.removeClass('open');
          body.removeClass('lock').css('padding-right', 0);
        }
      });
    })
    close.on('click', function () {
      btn.removeClass('is-active');
      menu.removeClass('open');
      body.removeClass('lock');
      body.css('padding-right', 0);
    })
  }
  menuMobile();

  // Выпадайки при клике по кнопке
  // Задать блокам выпадайкам айдишник совпадающий с data-drop="" в кнопке для этого блока
  // Задать кнопкам .js-drop-btn и data-drop="" с айдишником блока выпадайки
  function dropBlock(btn, lock = false) {
    let $this = undefined,
        drop = undefined,
        close = $('.js-drop-close'),
        body = $('body');
    btn.on('click', function () {
      let $this = $(this);
      let drop = $('#' + $this.data('drop'));
      let scrollWidth = (window.innerWidth - $(window).width());
      if (!$this.hasClass('is-active')) {
        $this.addClass('is-active');
        drop.addClass('open');
        if (lock) {
          body.toggleClass('lock');
          body.css('padding-right', scrollWidth);
        }
      } else {
        $this.removeClass('is-active');
        drop.removeClass('open');
        body.removeClass('lock');
        body.css('padding-right', 0);
      }
      $(document).mouseup(function (e) {
        if (!$this.is(e.target)
          && $this.has(e.target).length === 0
          && !drop.is(e.target)
          && drop.has(e.target).length === 0) {
          $this.removeClass('is-active');
          drop.removeClass('open');
          body.removeClass('lock');
          body.css('padding-right', 0);
        }
      });
    })
    close.on('click', function () {
      $('[data-drop="' + $(this).data('drop') +'"]').removeClass('is-active');
      $('#' + $(this).data('drop')).removeClass('open');
      body.removeClass('lock');
      body.css('padding-right', 0);
    })
  }
  dropBlock($('.js-drop-btn'));
  dropBlock($('.js-drop-menu'), true);

  // Swiper | Слайдер
  if ($('#swiper').length) {
    const swiper = new Swiper('#swiper', {
      slidesPerView: 1,
      simulateTouch: false,
      preventClicks: false,
      preventClicksPropagation: false,
      threshold: 3,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      },
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }

  // Swiper | Слайдер (множество одинаковых слайдеров)
  if ($('.js-slider-wrapper').length) {
    const Swipers = Array.from(document.querySelectorAll('.js-slider-wrapper'), n => {
      const Slider = new Swiper(n.querySelector('.js-slider'), {
        slidesPerView: 2.2,
        spaceBetween: 10,
        threshold: 3,
        pagination: {
          el: n.querySelector('.swiper__pagination'),
          clickable: true,
        },
        navigation: {
          prevEl: n.querySelector('.swiper-button-prev'),
          nextEl: n.querySelector('.swiper-button-next'),
        },
        breakpoints: {
          576: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          769: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1400: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }
      });
    })
  }

  // Air Datepicker | Календарь
  new AirDatepicker('#airDatepicker', {
    position: 'right top',
  });

  // Magnific Popup | Попап окна
  $('.open-popup-link').magnificPopup({
    mainClass: 'mfp-fade'
  });

  // Вычисление ширины скролла страницы или элемента
  function calculateScrollbarWidth(element) {
    if (!element) {
      return window.innerWidth - document.body.clientWidth;
    } else {
      return element.offsetWidth - element.clientWidth;
    }
  }

  // Исправление для хедера при появлении модального окна бутстрапа. Исправляет баг с прыжком влево. 
  $('.modal').on('show.bs.modal', function (e) {
    $('.modal-open-for-sticky').css('padding-right', calculateScrollbarWidth())
    console.log();
  });
  $('.modal').on('hidden.bs.modal', function (e) {
    $('.modal-open-for-sticky').css('padding-right', 0)
  });

  // Табы
	function tabs() {
    const tabs = $('.js-tabs');
		if (tabs.length) {
			tabs.each( function () {
        let triggers = $(this).find('.js-tabs-trigger');
        let contents = $(this).find('.js-tabs-content');
        let time = 300;
        triggers.on('click', function (e) {
          e.preventDefault();
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

  // Аккордеон
  function accordion(accordion, settings) {
    if (accordion.length) {
      $(accordion).each(function () {
        let currentAccordion = $(this);
        let item = currentAccordion.find('.accordion__item');
        let trigger = currentAccordion.find('.js-accordion-trigger');
        let content = currentAccordion.find('.js-accordion-content');
        let time = 300;
        trigger.on('click', function () {
          let currentTrigger = $(this);
          let data = currentTrigger.data('content');
          if (!currentTrigger.hasClass('active')) {
            if (settings) {
              content.stop().slideUp(
                time,
                function () {
                  $(this).removeClass('open');
                }
              )
              trigger.removeClass('active');
              item.removeClass('active');
            };
            currentTrigger.addClass('active');
            currentTrigger.closest('.accordion__item').addClass('active');
            currentAccordion.find('#' + data).stop().slideDown(
              time,
              function () {
                $(this).addClass('open')
              }
            );
          } else {
            currentTrigger.removeClass('active');
            currentTrigger.closest('.accordion__item').removeClass('active');
            currentAccordion.find('#' + data).stop().slideUp(
              time,
              function () {
                $(this).removeClass('open')
              }
            );
          }
        })
      })
    }
  }
  accordion($('.js-accordion'), true);

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
    const btn = $('.scrollup');
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

  // Показать еще пункты списка
  function showMoreFilters(list, count) {
    let btn = list.siblings('.js-more-btn');
    list.each(function () {
      $(this).find('li').each(function (index) {
        if (index > count - 1) {
          $(this).hide();
        }
      })
    })
    btn.on('click', function (e) {
      e.preventDefault();
      $(this).hide();
      $(this).parent().find($('.js-more-list li')).show();
    })
  }
  showMoreFilters($('.js-more-list'), 3);

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

  // noUiSlider || Ползунок выбора
  if (document.getElementById('noUiSlider')) {
    const rangeSlider = document.getElementById('noUiSlider');
    const inputMin = document.getElementById('noUiSliderMin');
    const inputMax = document.getElementById('noUiSliderMax');
    let min = Number(rangeSlider.dataset.min);
    let max = Number(rangeSlider.dataset.max);
    let nowMin = Number(rangeSlider.dataset.nowmin);
    let nowMax = Number(rangeSlider.dataset.nowmax);
    noUiSlider.create(rangeSlider, {
      start: [nowMin, nowMax],
      connect: true,
      step: 10,
      range: {
        'min': min,
        'max': max
      }
    });
    rangeSlider.noUiSlider.on('update', function (values, handle) {
      if (handle) {
        inputMax.value = values[handle];
      } else {
        inputMin.value = values[handle];
      }
    });
    inputMin.addEventListener('change', function () {
      rangeSlider.noUiSlider.set([this.value, null]);
    });
    inputMax.addEventListener('change', function () {
      rangeSlider.noUiSlider.set([null, this.value]);
    });
  };

  // Анимация счетчика
  function countNumber(block) {
    block.each(function () {
      var scrollTop = false,
        countNumberStatus = true,
        $this = $(this),
        blockPosition = $this.position().top,
        valUp = $this.data('val-up'),
        valTo = $this.data('val-to'),
        valDuration = $this.data('duration'),
        valDelay = $this.data('delay');
      $this.html(0);
      gofunc();
      $(window).scroll(function () {
        gofunc();
      });
      function gofunc() {
        scrollTop = $(window).scrollTop() + $(window).height() - 150;
        if (scrollTop > blockPosition && countNumberStatus) {
          setTimeout(() => {
            $({ numberValue: valUp }).animate({ numberValue: valTo }, {
              duration: valDuration,
              easing: "swing",
              step: function (val) {
                $this.html(Math.ceil(val));
              }
            });
          }, valDelay);
          countNumberStatus = false;
        }
      }
    });
  };
  countNumber($(".count-number"));

  // Изменение высоты textarea под вводимый текст
  $(function () {
    $('.eiv-textarea textarea').on('input keyup paste', function () {
      var $el = $(this),
        offset = $el.innerHeight() - $el.height();

      if ($el.innerHeight() < this.scrollHeight) {
        $el.height(this.scrollHeight - offset);
      } else {
        $el.height(1);
        $el.height(this.scrollHeight - offset);
      }
    });
  });

  // AOS || Анимация появления блоков при скролле
  AOS.init();

  // Autosize || Изменяющаяся высота textarea по контенту
  autosize(document.querySelectorAll('textarea'));

  // Inputmask || Маски для инпутов
  $('input[type=tel]').inputmask("+7 999-999-99-99");

  // Bootstrap Tooltips || Пользовательские подсказки
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

  // Поэкранный скролл
  if ($('#pagepiling').length) {
    $('#pagepiling').pagepiling({
      verticalCentered: false,
      scrollingSpeed: 0,
    });
  }

  // JQuery Scrollbar || Кастомизируемый скролл
  $('.scrollbar-inner').scrollbar();

  // Tooltipster || Пользовательская подсказка
  $('.tooltip').tooltipster();

  // Fancybox || Попап галерея
  Fancybox.bind("[data-fancybox]", {
    // Your custom options
  });

  // Включить анимацию когда круг в видимой области для плагина Circle Progress
  function circleProgressInView() {
    let cp = $('circle-progress');
    cp.each(function (index, element) {
      const value = element.attr('value');
      element.attr('value', 0);
      const intersectionCallback = (entries) => {
        entries.forEach(entry => {
          if (entry.intersectionRatio === 1) {
            entry.target.value = value
          } 
          // else if (entry.intersectionRatio === 0) {
          //   entry.target.value = 0
          // }
        })
      }
      const observer = new IntersectionObserver(intersectionCallback, {
        threshold: [0, 1],
      })
      observer.observe(element);
    });
  }
  circleProgressInView();

  // simpleParallax || Параллакс при скролле страницы
  const parallaxImg = document.querySelectorAll('.parallax');
  new SimpleParallax(parallaxImg, {
    scale: 2,
    delay: 0.5
  });

  // Yandex Map || Карта
  if ($('#map').length) {
    ymaps.ready(function () {
      var myMap = new ymaps.Map('map', {
        center: [55.751574, 37.573856],
        zoom: 9
      }, {
        searchControlProvider: 'yandex#search'
      }),

        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myGeoObject = new ymaps.GeoObject({
          // Описание геометрии.
          geometry: {
            type: "Point",
            coordinates: [55.8, 37.8]
          },
          // Свойства.
          properties: {
            // Контент метки.
            iconContent: 'Я тащусь',
            hintContent: 'Ну давай уже тащи'
          }
        });

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
          hintContent: 'Собственный значок метки',
          balloonContent: 'Это красивая метка'
        }, {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: 'default#image',
          // Своё изображение иконки метки.
          iconImageHref: '../img/my-icon.svg',
          // Размеры метки.
          iconImageSize: [48, 48],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-5, -38]
        }),

        myPlacemarkWithContent = new ymaps.Placemark([55.661574, 37.573856], {
          hintContent: 'Собственный значок метки с контентом',
          balloonContent: 'А эта — новогодняя',
          iconContent: '12'
        }, {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: 'default#imageWithContent',
          // Своё изображение иконки метки.
          iconImageHref: '../img/christmas-icon.svg',
          // Размеры метки.
          iconImageSize: [48, 48],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-24, -24],
          // Смещение слоя с содержимым относительно слоя с картинкой.
          iconContentOffset: [15, 15],
          // Макет содержимого.
          iconContentLayout: MyIconContentLayout
        });

      myMap.geoObjects
        .add(myGeoObject)
        .add(myPlacemark)
        .add(myPlacemarkWithContent);
    });
  }

}