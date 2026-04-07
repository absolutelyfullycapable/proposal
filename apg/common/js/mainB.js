$(function() {
  $("html, body").scrollTop(0);

  main.common();
});

const main = (function () {
  return {
    common () {
      // 헤더
      let headerOffsetTop;

      gsap.to("header", 0.7, {
        y: 0,
        opacity: 1,
        delay: 1,
        onComplete: () => {
          headerOffsetTop = $("header").offset().top;
        }
      });

      $(window).on("scroll", function () {
        let windowScrlTop = $(window).scrollTop();

        if (windowScrlTop >= headerOffsetTop) {
          $("header").addClass("fixed");
        } else {
          $("header").removeClass("fixed");
        }
      });

      $(".gnb-full-btn").on("click", function () {
        $(".menu-area").addClass("active");
      });

      $(".menu-area a").on("click", function () {
        $(this).closest(".menu-area").removeClass("active");
      });

      // gnb
      $(".kv-area .gnb").addClass("active");

      // kv swiper
      setTimeout(function () {
        $(".kv-area .swiper-slide.bk").removeClass("hide");
      }, 5000);

      let kvActive = true;

      const kvObserver = new IntersectionObserver(
        ([entry]) => {
          kvActive = entry.isIntersecting;
        },
        {
          threshold: 0.01,
        }
      );

      kvObserver.observe(document.querySelector(".kv-area"));

      const kvSwiper = new Swiper(".kv-area", {
        autoplay: {
          delay: 7000,
        },
        loop: true,
        effect: 'fade',
        allowTouchMove: false,
        on: {
          slideChangeTransitionStart: function () {
            if (!kvActive) return;

            const $active = $(this.slides[this.activeIndex]);

            if ($active.hasClass("bk")) {
              $("header a .wht").removeClass("active");
              $("header a .bk").addClass("active");
            } else {
              $("header a .wht").addClass("active");
              $("header a .bk").removeClass("active");
            }
          },
        }
      });

      gsap.to(".kv-area .wht .masking-box .masking-item img", {
        y: 0,
        stagger: 0.05,
        delay: 1
      });

      // membership service
       ScrollTrigger.create({
        trigger: ".mem-area",
        start: "top top",
        end: "bottom top",
        onEnter: () => {
          $("header a .wht").addClass("active");
          $("header a .bk").removeClass("active");
        },
      });

      const memTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".mem-area .tit-box",
          start: "top 55%",
          end:"bottom top"
        }
      });

      memTl.to(".mem-area .tit-box p img", {
        y: 0,
        ease: "ease-out"
      })
      .to(".mem-area .tit-box .desc", {
        y: 0,
        opacity: 1,
        ease: "ease-out"
      })
      .to(".mem-area .mem-list .mem-item", {
        y: 0,
        opacity: 1,
        stagger: 0.3,
        ease: "ease-out"
      });

      // content
      let currentTxtIndex = -1;

      function setActiveTxt(index) {
        const $items = $(".cont-area .cont-txt .txt-item");
        if (currentTxtIndex === index) return;

        if (currentTxtIndex >= 0) {
          const prev = $items.eq(currentTxtIndex);

          gsap.to(prev.find(".item-sub-tit, .list .list-item"), {
            opacity: 0,
            duration: 0.3,
            y: 0,
            overwrite: true,
          });

          prev.removeClass("active");
        }

        currentTxtIndex = index;
        const next = $items.eq(index);
        next.addClass("active");

        gsap.fromTo(
          next.find(".item-sub-tit, .list .list-item"),
          {
            opacity: 0,
            y: 50
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.3,
            delay:1 ,
            overwrite: true
          }
        );
      }


      const contTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".cont-area",
          start: "top top",
          end: "+=300%",
          pin: true,
          toggleActions: "play none none reverse",
          onUpdate: (self) => {
            if (self.progress < 0.3) {
              // title
              gsap.to(".cont-area .cont-tit .img-box", { y: 0 });

              // img
              gsap.to(".cont-area .cont-img .img-philosophy", {
                height: "100%",
                overwrite: true
              });
              gsap.to(".cont-area .cont-img .img-highlights", {
                height: "100%",
                overwrite: true
              });

              // txt
              setActiveTxt(0);

              // bg
              gsap.to(".cont-area .cont-bg .philosophy-bg", {
                height: "100%",
                overwrite: true
              });
              gsap.to(".cont-area .cont-bg .highlights-bg", {
                height: "100%",
                overwrite: true
              });

              gsap.to(".cont-area .cont-bg .highlights-bg .dimd", {
                opacity: 0.25,
                delay: 0.7,
                overwrite: true
              });
              gsap.to(".cont-area .cont-bg .membership-bg .dimd", {
                opacity: 0.25,
                delay: 0.7,
                overwrite: true
              });
            } else if (self.progress < 0.6) {
              // tit
              gsap.to(".cont-area .cont-tit .img-box", { y: -82 });

              // img
              gsap.to(".cont-area .cont-img .img-philosophy", {
                height: 0,
                overwrite: true
              });
              gsap.to(".cont-area .cont-img .img-highlights", {
                height: "100%",
                overwrite: true
              });

              // txt
              setActiveTxt(1);

              // bg
              gsap.to(".cont-area .cont-bg .philosophy-bg", {
                height: 0,
                overwrite: true
              });
              gsap.to(".cont-area .cont-bg .highlights-bg", {
                height: "100%",
                overwrite: true
              });

              gsap.to(".cont-area .cont-bg .highlights-bg .dimd", {
                opacity: 1,
                delay: 0.7,
                overwrite: true
              });
              gsap.to(".cont-area .cont-bg .membership-bg .dimd", {
                opacity: 0.25,
                delay: 0.7,
                overwrite: true
              });
            } else {
              // tit
              gsap.to(".cont-area .cont-tit .img-box", { y: -165 });

              // img
              gsap.to(".cont-area .cont-img .img-philosophy", {
                height: 0,
                overwrite: true
              });
              gsap.to(".cont-area .cont-img .img-highlights", {
                height: 0,
                overwrite: true
              });

              // txt
              setActiveTxt(2);

              // bg
              gsap.to(".cont-area .cont-bg .philosophy-bg", {
                height: 0,
                overwrite: true
              });
              gsap.to(".cont-area .cont-bg .highlights-bg", {
                height: 0,
                overwrite: true
              });

              gsap.to(".cont-area .cont-bg .highlights-bg .dimd", {
                opacity: 0.25,
                delay: 0.7,
                overwrite: true
              });
              gsap.to(".cont-area .cont-bg .membership-bg .dimd", {
                opacity: 1,
                delay: 0.7,
                overwrite: true
              });
            }
          }
        },
      });

      contTl.to(".cont-area .cont-sub-tit", 0.7, {
        y: 0,
        opacity: 0
      })
      .to(".cont-area .cont-tit", 0.7, {
          top: 256,
          width: 430,
          height: 82,
      }, "<")
      .to(".cont-area .cont-bg .bg-item:first-of-type .dimd", 0.7, {
        opacity: 1
      }, "<")
      .to(".cont-area .cont-bg .bg-item img", 0.7, {
        transform: "scale(1)"
      }, "<")
      .to(".cont-area .right", 0.7, {
        top: 256,
        opacity: 1
      }, "<+0.7")
      .call(() => {
        setActiveTxt(0)
      })
      .call(() => {
        $(".cont-area .cont-txt .txt-item .list").addClass("active");
      });

      // news
      ScrollTrigger.create({
        trigger: ".news-area",
        start: "top top",
        end: "bottom top",
        onEnter: () => {
          $("header a .wht").removeClass("active");
          $("header a .bk").addClass("active");
        },
        onLeaveBack: () => {
          $("header a .wht").addClass("active");
          $("header a .bk").removeClass("active");
        }
      });

      const newsTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".news-area .tit-box",
          start: "top 60%",
          end:"bottom top",
        }
      });

      newsTl.to(".news-area .tit-box img", {
        y: 0,
        opacity: 1,
        ease: "ease-out",
        stagger: 0.3
      })
      .to(".news-area .news-list .news-item", {
        y: 0,
        opacity: 1,
        stagger: 0.3,
        ease: "ease-out"
      });

      // popup
       gsap.to(".pop-area .util-btn", 0.7, {
        y: 0,
        opacity: 1,
        delay: 1,
      });

      setTimeout(function () {
        $(".pop-area .util-btn").addClass("reverse");
      }, 7000);

      gsap.to(".pop-area .util-btn", {
        scrollTrigger: {
          trigger: ".kv-area",
          start: "top top",
          end: "bottom bottom",
          endTrigger: ".pop-area",
          onEnterBack: () => {
            $(".pop-area .util-btn").addClass("fixed");
          },
          onLeave: () => {
            $(".pop-area .util-btn").removeClass("fixed");
          },
        }
      });

      $(".pop-area .util-btn").on("click", function () {
        $(".pop-area .pop-wrap").addClass("active");
      });

      $(".pop-area .pop-wrap .pop-box .list .item").on("click", function () {
        $(this).closest(".pop-box").removeClass("active").next(".pop-box").addClass("active");
      });

      $(".pop-area .pop-wrap .pop-box .close").on("click", function () {
        $(".pop-area .pop-wrap").removeClass("active");
        setTimeout(function () {
          $(".pop-area .pop-wrap .pop-box").removeClass("active").eq(0).addClass("active");
        }, 300);
      });
    }
  }
})();
