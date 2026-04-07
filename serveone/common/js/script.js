$(function() {
  gsap.registerPlugin(ScrollTrigger);
  main.common();
});

const main = (function () {
  return {
    common () {
      // scroll-motion 모션
      $(".scroll-motion").each(function (smIdx, smEl) {
        gsap.to(smEl, {
          scrollTrigger: {
            trigger: smEl,
            start: "top 60%",
            end:"bottom bottom",
            onEnter: function () {
              gsap.to(smEl, 1, {
                opacity: 1,
                y: 0,
                ease: Power3.easeOut
              });
            }
          },
        });
      });


      // kv swiper
      const $swiperProgressBar = $(".kv-swiper .swiper-util .pagination .progress-bar p");
      let kvSwiper, mainSwiperCurrent, mainSwiperTotal, motionTl;

      kvSwiper = new Swiper(".kv-swiper", {
        observer: true,
        observeParents: true,
        speed: 1500,
        allowTouchMove: false,
        on: {
          init: function () {
            // pagination
            mainSwiperTotal = this.slides.length;
            mainSwiperCurrent = this.realIndex + 1;

            $(".kv-swiper .swiper-util .current").text(mainSwiperCurrent);
            $(".kv-swiper .swiper-util .total").text(mainSwiperTotal);
          },
          slideChangeTransitionStart: function () {
            // pagination
            mainSwiperCurrent = this.realIndex + 1;

            setTimeout(function () {
              $(".kv-swiper .swiper-util .current").text(mainSwiperCurrent);
            }, 500);

            // progress bar
            gsap.killTweensOf($swiperProgressBar);
            gsap.set($swiperProgressBar, {
              delay: 0.5,
              width: "0%"
            });
          },
          slideChangeTransitionEnd: function () {
            // active slide
            activeSlideMotion(this);

            // progress bar
            gsap.to($swiperProgressBar, {
              duration: 12,
              width: "100%"
            });
          }
        }
      });

      function activeSlideMotion(swiper) {
        const $targets = $(swiper.slides[swiper.activeIndex]).find(".motion");
        const $slideBg = $(swiper.slides[swiper.activeIndex]).find(".bg-area img");

        if (!$targets.length && !$slideBg.length) return;

        motionTl = gsap.timeline();

        $targets.each(function (idx, el) {
          motionTl.to(el, {
            onStart: () => {
              $(el).addClass("active");
            },
          }, idx * 0.2)
          .to($slideBg, 1.5, {
            scale: 1,
            ease: Power3.easeOut
          }, "<");
        });
      }

      $(".swiper-wrapper").on("click", function () {
        kvSwiper.slideNext();
      });


      // 진입 시 모션
      setTimeout(function () {
        const initTl = gsap.timeline({
          onComplete: () => {
            gsap.to(".kv-wrap .swiper-area .kv-swiper .swiper-util", 0.6, {opacity: 1, y: 0, ease: Power1.easeOut, delay: 0.4});
            gsap.to(".kv-wrap .swiper-area .search-box", 0.6, {opacity: 1, bottom: 48, ease: Power1.easeOut, delay: 0.6});
            gsap.to($swiperProgressBar, {duration: 12, width: "100%", delay: 0.8});
          }
        });

        initTl.to("header", 0.7, {y: 0})
        .to(".kv-wrap .swiper-area", 1, {scale: 1, delay: 0.2, ease: Power3.easeOut}, "<")
        .to(".kv-wrap .swiper-area .kv-swiper .swiper-slide.slide1 .bg-area", 1, {opacity: .7, ease: Power3.easeOut}, "<")
        .to(".kv-wrap .swiper-area .kv-swiper .swiper-slide.slide1 .bg-area video", {
          scale: 1,
          onStart: function () {
            setTimeout(function () {
              $(".kv-wrap .swiper-area .kv-swiper .swiper-slide.slide1 .bg-area video").get(0).play();
              activeSlideMotion(kvSwiper);
            }, 300);
          }
        }, "<");
      }, 100);


      // 헤더 스크롤 모션
      let lastScrlTop = 0;

      $(window).on("scroll", function () {
        const currentScrl = window.scrollY;

        if (lastScrlTop < currentScrl) {
          gsap.to("header", 0.7, {y: "-100%"});
        } else {
          gsap.to("header", 0.7, {y: 0});
        }

        lastScrlTop = window.scrollY;
      });


      // gnb hover
      $("header .inner .gnb").hover(function () {
        gsap.to("header .inner .menu-wrap", 1, {top: 120, ease: Power2.easeInOut});
        $(".dimd").addClass("active");
      }, function () {
        gsap.to("header .inner .menu-wrap", 1, {top: -560, ease: Power2.easeInOut});
        $(".dimd").removeClass("active");
      });


      // kv search
      $(".search-box .search-input img.active").on("click", function () {
        $(".search-box").addClass("active");
        $(".search-box .search-input img").removeClass("active");
        $(".search-box .search-input img.on").addClass("active");
      });

      $(".search-box .btn-close, .search-box .search-result").on("click", function () {
        $(".search-box").removeClass("active");
        $(".search-box .search-input img").removeClass("active");
        $(".search-box .search-input img.off").addClass("active");
      });

      // support
      gsap.to(".support-wrap .bg-area video", {
        scrollTrigger: {
          trigger: ".support-wrap",
          start: "top 60%",
          end:"bottom bottom",
          onEnter: function () {
            $(".support-wrap .bg-area video").get(0).play();
          }
        },
      });

      ScrollTrigger.create({
        trigger: ".support-wrap .list-area",
        start: "top 80%",
        end:"bottom bottom",
        onEnter: function () {
          $(".support-wrap .list-area .list-item").each(function (supportIdx, supportEl) {
            let supportMotionCount = 0;

              for (let i = 0; i < supportIdx; i++) {
                supportMotionCount += i % 2 === 0 ? 100 : 700;
              }

              setTimeout(function () {
                $(supportEl).addClass("active");
              }, supportMotionCount);
          });
        }
      });


      // business
      gsap.to(".business-wrap .bg-area video", {
        scrollTrigger: {
          trigger: ".business-wrap",
          start: "top 60%",
          end:"bottom bottom",
          onEnter: function () {
            $(".business-wrap .bg-area video").get(0).play();
          }
        },
      });

      ScrollTrigger.create({
        trigger: ".business-wrap .list-area",
        start: "top 70%",
        end:"bottom bottom",
        onEnter: function () {
          $(".business-wrap .list-area .list-item").each(function (idx, el) {
            setTimeout(function () {
              $(el).addClass("active");
            }, idx * 300);
          });
        }
      });


      // info
      gsap.to(".info-wrap .tit-area > *", .6, {
        scrollTrigger: {
          trigger: ".info-wrap",
          start: "top 40%",
          end:"bottom bottom"
        },
        y: 0,
        opacity: 1,
        stagger: 0.3,
        ease: Power1.easeOut
      });

      gsap.to(".info-wrap .bg-area", .6, {
        scrollTrigger: {
          trigger: ".info-wrap",
          start: "top 40%",
          end:"bottom bottom",
        },
        opacity: 1,
        delay: .9,
        ease: Power1.easeOut
      });

      const infoTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".info-wrap",
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 2
        }
      });

      infoTl.to(".info-wrap .bg-area", {width: "100vw", height: "100vh"}, "+=0.1")
      .to(".info-wrap .bg-area .bg-dimd", {opacity: .4}, "<")
      .to(".info-wrap .bg-area img", {top: 0}, "<")
      .to(".info-wrap .cont-area", {top: 97}, "<")
      .to(".info-wrap .tit-area", {left: 160, transform: "translateX(0)"}, "<")
      .to(".info-wrap .tit-area > img", {y: -70, opacity: 0}, "<")
      .to(".info-wrap .tit-area p span", {margin: 0, color: "#fff"}, "<")
      .to(".info-wrap .list-area img:first-of-type", {y: 70, opacity: 1})
      .to(".info-wrap .list-area img:nth-of-type(2)", {y: 180, opacity: 1}, "<+=0.2")
      .to(".info-wrap .list-area img:nth-of-type(3)", {y: 50, opacity: 1}, "<+=0.2")
      .to(".info-wrap .list-area img:nth-of-type(4)", {y: 110, opacity: 1}, "<+=0.2")
      .to(".info-wrap .list-area img:last-of-type", {y: 0, opacity: 1}, "<+=0.2")
      .to(".info-wrap .cont-area", {top: -103})
      .to(".view-more-btn-wrap", 0.3, {bottom: 48, opacity: 1}, "<+=0.1");


      // catalog
      gsap.to(".catalog-wrap", {
        scrollTrigger: {
          trigger: ".catalog-wrap",
          start: "top 95%",
          end:"bottom bottom",
          onEnter: function () {
            $(".view-more-btn-wrap").addClass("type2");
            $(".view-more-btn-wrap span").text("서브원 카탈로그 보기");
          },
           onLeaveBack: function () {
            $(".view-more-btn-wrap").removeClass("type2");
            $(".view-more-btn-wrap span").text("기업소개 더보기");
          }
        },
      });

       $(".catalog-wrap .tit-area img").each(function (cataTitIdx, cataTitEl) {
        gsap.to(cataTitEl, {
          scrollTrigger: {
            trigger: cataTitEl,
            start: "top 60%",
            end:"bottom bottom",
            onEnter: function () {
              gsap.to(cataTitEl, 1, {
                opacity: 1,
                y: 0,
                ease: Power3.easeOut
              });
            }
          },
        });
      });

      gsap.to(".catalog-wrap .inner .list-area img", {
        scrollTrigger: {
          trigger: ".catalog-wrap .inner .list-area",
          start: "top 60%",
          end:"bottom bottom",
        },
        y: 0,
        opacity: 1,
        stagger: 0.15,
        ease: Power1.easeOut,
        delay: .3
      });


      // esg
      gsap.to(".esg-wrap", {
        scrollTrigger: {
          trigger: ".esg-wrap",
          start: "top 95%",
          end:"bottom bottom",
          onEnter: function () {
            $(".view-more-btn-wrap span").text("ESG 더보기");
          },
          onEnterBack: function () {
            $(".view-more-btn-wrap").css("position", "fixed");
          },
          onLeave: function () {
            $(".view-more-btn-wrap").css("position", "absolute");
          },
          onLeaveBack: function () {
            $(".view-more-btn-wrap span").text("서브원 카탈로그 보기");
          }
        },
      });

      const esgTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".esg-wrap",
          start: "top 35%",
          end:"bottom bottom"
        }
      });

      esgTl.to(".esg-wrap .sub-tit", 0.5, {y: 0, opacity: 1, ease: Power1.easeOut})
      .to(".esg-wrap .inner .tit-area img", 1, {y: 0, stagger: .15, ease: Power1.easeOut}, "<+=0.1")
      .to(".esg-wrap .bg-area", 0.7, {scale: 1, opacity: 1, ease: Power1.easeOut}, "<+=0.6")
      .to(".esg-wrap .inner .desc", 0.5, {y: 0, opacity: 1, ease: Power1.easeOut}, "<+=0.2");


      // news
      gsap.to(".news-wrap .tit-area img", {
        scrollTrigger: {
          trigger: ".news-wrap .tit-area",
          start: "top 70%",
          end:"bottom bottom"
        },
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: Power1.easeOut
      });

      gsap.to(".news-wrap .list-area img", {
        scrollTrigger: {
          trigger: ".news-wrap .list-area",
          start: "top 70%",
          end:"bottom bottom"
        },
        y: 0,
        opacity: 1,
        stagger: 0.2,
        ease: Power1.easeOut
      });

      $(".news-wrap .list-area").on("click", function () {
        let moveX = $(".news-wrap .list-area").outerWidth() - $(".news-wrap .inner").outerWidth();

        if ($(this).hasClass("is-move")) {
          $(this).removeClass("is-move");
          gsap.to(".news-wrap .list-area", 1, {x: 0, ease: Power3.easeInOut});
        } else {
          $(this).addClass("is-move");
          gsap.to(".news-wrap .list-area", 1, {x: -moveX, ease: Power3.easeInOut});
        }
      });


      // banner
      gsap.to(".banner-wrap a", {
        scrollTrigger: {
          trigger: ".banner-wrap",
          start: "top 60%",
          end:"bottom bottom",
          onEnter: function () {
            gsap.to(".banner-wrap a img", {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              delay: .5,
              ease: Power1.easeOut
            });
          }
        },
        y: 0,
        opacity: 1,
        ease: Power1.easeOut
      });


      // floating button
      gsap.to(".floating-btn-wrap", {
        scrollTrigger: {
          trigger: "footer",
          start: "top bottom",
          end:"bottom bottom",
          onEnter: function () {
            $(".floating-btn-wrap").css("position", "absolute");
          },
          onLeaveBack: function () {
             $(".floating-btn-wrap").css("position", "fixed");
          }
        },
      });

      $(".floating-btn-wrap .util-btn-area a").on("click", function () {
        if ($(this).closest(".util-btn-area").hasClass("active")) {
          $(this).closest(".util-btn-area").removeClass("active");
        } else {
          $(this).closest(".util-btn-area").addClass("active");
        }
      });


      // chatbot
      $(".floating-btn-wrap .chatbot-area a").on("click", function () {
        if ($(this).closest(".chatbot-area").hasClass("active")) {
          $(this).closest(".chatbot-area").removeClass("active");
          gsap.to($(".floating-btn-wrap .chatbot-area .chat-bg .chat img"), 0, {y: 0, delay: 0.5});
        } else {
          $(this).closest(".chatbot-area").addClass("active");
        }
      });

      $(".floating-btn-wrap .chatbot-area .chat-bg").on("click", function () {
        gsap.to($(this).find(".chat img"), 1, {
          y: -266,
          ease: Power3.easeOut
        });
      });
    }
  }
})();
