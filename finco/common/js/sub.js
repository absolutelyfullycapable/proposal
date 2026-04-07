$(function () {
  subFnc.common();
});

const subFnc = (function() {
  return {
    common() {
      let _this_scroll;
      let _isScrollTop;

      gsap.to($("header"), { top: 0, duration: 1, delay: 0.2, ease: Power2.easeOut });

      $(window).on("scroll", function () {
        _isScrollTop = $(window).scrollTop();
        if (_isScrollTop > _this_scroll) {
          // down
          if (_isScrollTop > 0) {
            gsap.to($("header"), { top: -130, duration: .5, ease: Power2.easeOut });
          }
        }
        if (_isScrollTop < _this_scroll) {
          // up
          $("header").removeClass("hide");
          gsap.to($("header"), { top: 0, duration: .5, ease: Power2.easeOut });
        }
        _this_scroll = _isScrollTop;
      });

      $(".kv-area .cate-wrap > a").on("click", function () {
        if ($(this).find("h2").hasClass("on")) {
          $(this).find("h2").removeClass("on");
          $(".kv-area .cate-wrap .cate-list").slideUp(500);
        } else {
          $(this).find("h2").addClass("on");
          $(".kv-area .cate-wrap .cate-list").slideDown(500);
        }
      });

      gsap.utils.toArray(".scroll-motion").forEach((item) => {
        gsap.to(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom top",
            toggleClass: {
              targets: item,
              className: "active"
            },
            once: true
          },
        });
      });
    }
  }
})();
