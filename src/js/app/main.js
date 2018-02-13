(function ($, Swiper) {
  $(function () {

    const CLASS_INVALID = 'invalid'

    const CLASS_ACTIVE = 'active'

    const is = ((el) => { return typeof el !== 'undefined' && el.length})

    const $window = $(window)

    const $page = $('.page')

    // multiple menu
    {
      const $menu = $('.js-menu')
      const $sub = $('.js-menu-sub')
      const $left = $('.left')

      $menu.find('.parent').on('mouseover', (e) => {
        const $this = $(e.currentTarget)
        if (!$this.hasClass(CLASS_ACTIVE)) {
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

          $menu.find('.parent').removeClass(CLASS_ACTIVE)
          $this.addClass(CLASS_ACTIVE)
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
                $menu.find('.parent').removeClass(CLASS_ACTIVE)
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

    // main slider
    {
      new Swiper('.mobile-news', {
        slidesPerView: 'auto',
        autoplay: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      })
    }

    // projects
    {
      new Swiper('.js-projects', {
        slidesPerView: 'auto',
        autoplay: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
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
        $(e.currentTarget).parent().removeClass(CLASS_INVALID)
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
        $this.animate({opacity: 0}, duration, () => {
          if (isShow) {
            $text.text(
              $hiddenBlock.find('b').text()
            )
          } else {
            $text.text(hideButtonText)
          }
          $this.toggleClass(showClass, !isShow)
          $hiddenBlock.slideToggle(duration)
          setTimeout(() => { $this.animate({opacity: 1}, duration) }, duration)
        })
      })

      $('.js-latent').on('click', (e) => {
        const $this = $(e.currentTarget)
        const $hiddenBlock = $this.parent().find('.latent-block')
        $hiddenBlock.slideToggle(duration)
      })
    }

    // lang
    {
      $('.js-lang').on('click', (e) => {
        $(e.currentTarget).toggleClass('show')
      })
    }

    // mobile
    {
      const MOBILE_SCREEN_RESOLUTION = 1024
      const CLASS_MOBILE_OPEN = 'mobile-open'

      const $mobileMenu = $('.mobile-menu')
      const $mobileMenuParents = $mobileMenu.find('.parent')
      const $mobileButton = $('.js-mobile')

      $mobileButton.on('click', () => { $page.toggleClass(CLASS_MOBILE_OPEN) })

      $mobileMenuParents.find('span').on('click', (e) => {
        const $this = $(e.currentTarget)
        const $parent = $this.parent()
        const $ul = $parent.find('ul')
        if ($parent.hasClass(CLASS_ACTIVE)) {
          $parent.removeClass(CLASS_ACTIVE)
          $ul.slideUp()
        } else {
          $parent.addClass(CLASS_ACTIVE)
          $ul.slideDown()
        }
      })

      $window.resize((e) => {
        const width = e.currentTarget.innerWidth
        if (width > MOBILE_SCREEN_RESOLUTION && $page.hasClass(CLASS_MOBILE_OPEN)) {
          $page.removeClass(CLASS_MOBILE_OPEN)
          $mobileMenuParents
            .find('span').removeClass(CLASS_ACTIVE)
            .parent().find('ul').removeAttr('style')
        }
      })
    }

    // fixed left menu
    {
      const MENU_FIXED_CLASS = 'menu-fixed'

      const $main = $page.find('.main')
      const offsetTop = $main.offset().top

      $page.scroll((e) => {
        const scrollTop = e.target.scrollTop
        $main.toggleClass(MENU_FIXED_CLASS, scrollTop >= offsetTop)
      })
    }

    // custom select
    {
      $page.find('.js-select').each((index, el) => {
        const $this = $(el)
        const $parent = $this.parent()
        const dataPlaceholder = $this.data('placeholder')

        let params = { includeValue: true }
        if (is(dataPlaceholder)) {
          params.placeholder = $('<span/>', {
            class: 'gray',
            text: dataPlaceholder
          })
        }
        $this.customSelect(params)

        if ($parent.hasClass(CLASS_INVALID)) {
          $parent.find('.custom-select > .custom-select__option').on('click', () => {
            $parent.removeClass(CLASS_INVALID)
          })
        }
      })
    }

    // industry buttons
    {
      $('.js-industry').on('click', (e) => {
        const $this = $(e.currentTarget)
        const isActive = $this.hasClass(CLASS_ACTIVE)

        if (isActive) {
          $this.parent().find('input[type=hidden][value=' + $this.val() + ']').remove()
        } else {
          $('<input/>', {
            type: 'hidden',
            value: $this.val(),
            name: $this.data('hidden-name')
          }).insertAfter($this)
        }
        $this.toggleClass(CLASS_ACTIVE, !isActive)
      })
    }

  })
})(jQuery, Swiper)
