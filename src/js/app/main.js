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

  })
})(jQuery, Swiper)
