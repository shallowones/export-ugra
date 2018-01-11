(function ($, Swiper) {
  $(function () {

    // multiple menu
    {
      const $menu = $('.menu')
      const $sub = $('.sub')
      const $left = $('.left')

      $menu.find('.parent').on('mouseover', (e) => {
        const $this = $(e.currentTarget)
        if (!$this.hasClass('active')) {
          const $ul = $(e.currentTarget).find('ul')
          if ($sub.hasClass('show')) {
            $sub.stop().animate({
              opacity: 0
            }, 100, () => {
              setTimeout(() => {
                $sub.html($ul[0].outerHTML)
                $sub.animate({opacity: 1}, 300)
              }, 200)
            })
          } else {
            $sub
              .html($ul[0].outerHTML)
              .addClass('show')
              .stop().animate({opacity: 1}, 100)
          }

          $menu.find('.parent').removeClass('active')
          $this.addClass('active')
        }
      })

      const closeSubMenu = ((e) => {
        if ($sub.hasClass('show')) {
          const $target = $(e.target)
          if (!$left.find($target).length) {
            $sub.stop().animate({
              opacity: 0,
              //transform: 'translate(-20px, 0)'
            }, 300, () => {
              setTimeout(() => {
                $sub
                  .removeClass('show')
                  .removeAttr('style')
                $menu.find('.parent').removeClass('active')
              }, 200)
            })
          }
        }
      })

      $('body').bind('mouseover', closeSubMenu)
    }

    // main slider
    {
      new Swiper('.js-main-slider', {
        slidesPerView: 'auto',
        autoplay: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      })
    }

    // projects
    {
      new Swiper('.js-projects', {
        slidesPerView: 'auto',
        autoplay: true
      })
    }

    // partners
    {
      new Swiper('.js-partners', {
        slidesPerView: 'auto',
        autoplay: true,
        navigation: {
          nextEl: '.js-partners-next',
          prevEl: '.js-partners-prev'
        },
      })
    }

    // detail slider
    {
      const countSlides = 6
      const slider = new Swiper('.js-slider', {
        loop: true,
        loopedSlides: countSlides,
        slidesPerView: 'auto',
        grabCursor: true,
        navigation: {
          nextEl: '.slider-next',
          prevEl: '.slider-prev'
        }
      })
      new Swiper('.js-slider-thumbs', {
        loop: true,
        loopedSlides: countSlides,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true,
        controller: {
          control: slider
        },
        on: {
          init: function () {
            slider.controller.control = this
          }
        }
      })
    }

    // invalid form controls
    {
      $('.form-control.invalid').find('.form-control__input, .form-control__textarea').focus((e) => {
        $(e.currentTarget).parent().removeClass('invalid')
      })
    }

    // hidden
    {
      const hideButtonText = 'Свернуть'
      const showClass = 'show'
      const duration = 200
      $('.js-hidden').on('click', (e) => {
        const $this = $(e.currentTarget)
        const $hiddenBlock = $this.parent().find('.hidden-block')
        const $text = $this.find('span')
        const isShow = $this.hasClass(showClass)
        $this.animate({ opacity: 0 }, duration, () => {
          if (isShow) {
            $text.text(
              $hiddenBlock.find('b').text()
            )
          } else {
            $text.text(hideButtonText)
          }
          $this.toggleClass(showClass, !isShow)
          $hiddenBlock.slideToggle(duration)
          setTimeout(() => { $this.animate({ opacity: 1 }, duration) }, 200)
        })
      })
    }

    // lang
    {
      $('.js-lang').on('click', (e) => {
        $(e.currentTarget).toggleClass('show')
      })
    }

  })
})(jQuery, Swiper)
