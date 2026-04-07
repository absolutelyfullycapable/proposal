$(function () {
  subFnc.common();
});

const subFnc = (function () {
  return {
    common() {
      // 진입 모션
      gsap.to($("header"), {
        top: 0,
        duration: 1,
        delay: 0.2,
        ease: Power2.easeOut,
      });

      gsap.to(".kv-area h2", {
        className: "active",
        delay: 0.2,
      });

      gsap.to(".kv-area .img-wrap", {
        className: "img-wrap active",
        delay: 0.2,
      });

      // scroll-motion 공통
      gsap.utils.toArray(".scroll-motion").forEach((item) => {
        gsap.to(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
            end: "bottom top",
            toggleClass: {
              targets: item,
              className: "active",
            },
            once: true,
          },
        });
      });

      // 헤더 스크롤
      let _this_scroll;
      let _isScrollTop;

      $(window).on("scroll", function () {
        _isScrollTop = $(window).scrollTop();

        if (_isScrollTop > _this_scroll) {
          // down
          if (_isScrollTop > 0) {
            gsap.to($("header"), {
              top: -130,
              duration: 0.5,
              ease: Power2.easeOut,
            });
          }
        }

        if (_isScrollTop < _this_scroll) {
          // up
          gsap.to($("header"), { top: 0, duration: 0.7, ease: Power2.easeOut });
        }

        _this_scroll = _isScrollTop;
      });

      // 키비주얼 영역
      setTimeout(function () {
        const kvTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".kv-area .fixed-box",
            start: `-=${
              (window.innerHeight - $(".kv-area .img-wrap").innerHeight()) / 2
            } top`,
            end: "bottom bottom",
            endTrigger: ".kv-area",
            pin: true,
            scrub: 1,
          },
        });

        kvTimeline
          .to(".kv-area .img-wrap", 2, {
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
            top: `-${
              (window.innerHeight - $(".kv-area .img-wrap").innerHeight()) / 2
            }`,
            delay: 0.5,
            transition: "none",
          })
          .to(
            ".kv-area .img-wrap .dimd",
            2,
            {
              opacity: 1,
            },
            "<"
          )
          .to(".kv-area .img-wrap .txt-box", 2, {
            className: "txt-box active",
          })
          .to(".kv-area .img-wrap .txt-box .desc", 2, {
            y: 0,
          })
          .to({}, { duration: 2 });
      }, 0);

      // Engine Parts 영역
      $(window).scroll(function () {
        let scrollPosition = $(window).scrollTop();
        const bearingOffsetTop =
          $(".main-bearing").offset().top - $(window).height() / 2 - 100;

        if (scrollPosition >= bearingOffsetTop) {
          $(".engine-parts .desc-list .desc-item.item4 .fixed-nav li")
            .removeClass("on")
            .eq(1)
            .addClass("on");
        } else {
          $(".engine-parts .desc-list .desc-item.item4 .fixed-nav li")
            .removeClass("on")
            .eq(0)
            .addClass("on");
        }
      });

      // news 영역
      gsap.to(".news .desc img", {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".news .desc",
          start: "top 75%",
          end: "bottom top",
        },
      });
    },
  };
})();
