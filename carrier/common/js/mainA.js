$(function() {
  gsap.registerPlugin(ScrollTrigger);
});

$(window).load(function(){
  main.common();
})

const main = (function () {
  return {
    common () {
      // intro 비디오
      setTimeout(function () {
        gsap.to(".intro-wrap video", {
          delay: 0.1,
          onStart: function () {
            $(".intro-wrap video").get(0).play();
          }
        })
      }, 10);

      $(".intro-wrap").on("click", function () {
        $(this).addClass("hide");
        initMotion();
      });


      // 진입 모션
      function initMotion () {
        gsap.fromTo("header", {
          y: -120
        }, {
          duration: 2,
          ease: Power4.easeOut,
          y: 0,
        });

        const kvTitTl = gsap.timeline();

        kvTitTl.to({}, {duration: 0.2})
        .to(".kv-swiper .slide1 .bg-area .dimd", 1, {opacity: 0.4})
        .to(".kv-swiper .swiper-util-box", 1, {opacity: 1}, "<")
        .to(".kv-swiper .slide1 .tit-area p:first-of-type img", 1.3, {y: 0, ease: Power4.easeOut, onStart: function () {
          gsap.to(".kv-swiper .slide1 .bg-area video", 2, {scale: 1, ease: Power4.easeOut});
          $(".kv-swiper .slide1 .bg-area video").get(0).play();
        }}, "<")
        .to(".kv-swiper .slide1 .tit-area p:nth-of-type(2) img", 1.3, {y: 0, ease: Power4.easeOut}, "<+=0.2")
        .to(".kv-swiper .slide1 .tit-area p:last-of-type img", 1.3, {y: 0, ease: Power4.easeOut}, "<+=0.2")
        .to(".kv-swiper .slide1 .tit-area > img", 1.3, {y: 0, opacity: 1, delay: 0.2, ease: Power4.easeOut, onComplete: function () {
          $("body").removeClass("scrl-lock");
        }}, "<+=0.2");
      }


      // kv
      const kvSwiper = new Swiper(".kv-swiper", {
        observer: true,
        observeParents: true,
        speed: 1500,
        allowTouchMove: false,
        on: {
          slideChangeTransitionEnd: function () {
            activeSlideMotion(this);
          }
        }
      });

      function activeSlideMotion(swiper) {
        const $target = $(swiper.slides[swiper.activeIndex]);

        if (!$target.length) return;

        motionTl = gsap.timeline();

        motionTl.to({}, {duration: 0.2})
        .to($target.find(".bg-area .dimd"), 1, {opacity: 0.4})
        .to($target.find(".tit-area p:first-of-type img"), 1.3, {y: 0, ease: Power4.easeOut, onStart: function () {
          gsap.to($target.find(".bg-area video"), 2, {scale: 1, ease: Power4.easeOut});
          $target.find(".bg-area video").get(0).play();
        }}, "<")
        .to($target.find(".tit-area p:nth-of-type(2) img"), 1.3, {y: 0, ease: Power4.easeOut}, "<+=0.2")
        .to($target.find(".tit-area p:last-of-type img"), 1.3, {y: 0, ease: Power4.easeOut}, "<+=0.2")
        .to($target.find(".tit-area > img"), 1.3, {y: 0, opacity: 1, delay: 0.2, ease: Power4.easeOut}, "<+=0.2");
      }

      $(".kv-wrap .kv-swiper .swiper-util-box").on("click", function () {
        kvSwiper.slideNext();
      });


      // header
      $(window).on("scroll", function () {
        if ($(window).scrollTop() > 0) {
          gsap.to("header", 1, {y: -120});
          gsap.to(".floating-btn-wrap .plus", {bottom: 80});
        } else if ($(window).scrollTop() === 0) {
          gsap.to("header", 1, {y: 0});
          gsap.to(".floating-btn-wrap .plus", {bottom: 0});
        }
      });

      $("header .gnb-wrap").hover(function () {
        gsap.to("header", 0.3, {backgroundColor: "#fff"});

        $("header .util-wrap .shop a img").removeClass("active").eq(1).addClass("active");
        $("header .util-wrap .menu a img").removeClass("active").eq(1).addClass("active");

        gsap.to("header .gnb-menu-area", 0, {height: "auto"});
      }, function () {
        gsap.to("header", 0.3, {backgroundColor: "transparent"});

        $("header .util-wrap .shop a img").removeClass("active").eq(0).addClass("active");
        $("header .util-wrap .menu a img").removeClass("active").eq(0).addClass("active");

        gsap.to("header .gnb-menu-area", 0, {height: 0});
      });

      $("header .util-wrap .shop a").on("click", function () {
        if ($(this).next(".shop-pop").hasClass("active")) {
          $(this).next(".shop-pop").removeClass("active");
        } else {
          $(this).next(".shop-pop").addClass("active");
        }
      });

      $("header .util-wrap .menu > a").on("click", function () {
        $("body").addClass("scrl-lock");
        $("header .util-wrap .menu .menu-pop").addClass("active");
      });

      $("header .util-wrap .menu .menu-pop .menu-head a").on("click", function () {
        $("body").removeClass("scrl-lock");
        $("header .util-wrap .menu .menu-pop").removeClass("active");
      });


      // about
      const aboutIntroTl = gsap.timeline( {
        scrollTrigger: {
          trigger: ".about-wrap .about-intro-area",
          start: "top 40%",
          end: "bottom bottom"
        },
        ease: Power4.easeOut
      });

      aboutIntroTl.to(".about-wrap .about-intro-area .tit:nth-of-type(2)", 1.2, {opacity: 1, transform: "translate(-50%, -50%)"})
      .to(".about-wrap .about-intro-area .tit:first-of-type", 1.2, {opacity: 1, transform: "translate(calc(-50% - 268px), -50%)"}, "<")
      .to(".about-wrap .about-intro-area .tit:last-of-type", 1.2, {opacity: 1, transform: "translate(calc(-50% + 280px), -50%)"}, "<");

      const aboutContTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-wrap",
          start: "top top",
          end: "+=500%",
          pin: true,
          pinSpacing: true,
          scrub: 1
        }
      });

      aboutContTl.to({}, {duration: 0.5})
      .to(".about-wrap .about-intro-area .tit:nth-of-type(2)", 0.5, {scale: 0, opacity: 0})
      .to(".about-wrap .about-intro-area .tit:first-of-type", 0.5, {transform: "translate(calc(-50% - 248px), -50%)"}, "<")
      .to(".about-wrap .about-intro-area .tit:last-of-type", 0.5, {transform: "translate(calc(-50% + 260px), -50%)"}, "<")
      .to({}, {duration: 1})
      .to(".about-wrap .mask", 1.72, {height: "0"})
      .to(".about-wrap .about-item-area", 1.5, {top: "50%",  width: 1800}, "<")
      .to(".about-wrap .about-item-area .dimd", 1.5, {opacity: 1}, "<")
      .to(".about-wrap .about-intro-mask-area", 0.6, {top: "-7vh"})
      .to(".about-wrap .about-item-area .desc-box", 0.6, {top: "45.9vh", opacity: 1}, "<")
      .to({}, {duration: 0.3});


      // solution
      const solBaseAttribute = {
        scrollTrigger: {
          trigger: ".sol-wrap",
          start: "top 35%",
          end: "bottom bottom",
          scrub: 2
        },
      }

      gsap.to("body, .sol-wrap .tit-area", 1, {
        ...solBaseAttribute,
        backgroundColor: "#000"
      });

      gsap.to(".sol-wrap .tit-area p", 2, {
        ...solBaseAttribute,
        y: 0,
        opacity: 1
      });

      const solTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".sol-wrap",
          start: "top top",
          end: "+=1000%",
          pin: true,
          pinSpacing: true,
          scrub: 1
        }
      });

      solTl.to(".sol-wrap .tit-area p span", 1, {color: "#fff", stagger: 0.5})
      .to(".sol-wrap .tit-area", 1, {height: "50vh"})
      .to(".sol-wrap .desc-area", 1, {top: "40%"}, "<")
      .to(".sol-wrap .tit-area p:first-of-type", 1, {y: -84, opacity: 0}, "<")
      .to(".sol-wrap .tit-area p:nth-of-type(2)", 1, {y: -84, opacity: 0}, "<")
      .to(".sol-wrap .tit-area p:last-of-type", 1, {y: "-100%"}, "<")
      .to({}, {duration: 1})
      .to(".sol-wrap .tit-area", 1, {height: 0})
      .to(".sol-wrap .tit-area p:last-of-type", 1, {opacity: 0}, "<")
      .to(".sol-wrap .desc-area", 2, {top: 0}, "<")
      .to(".sol-wrap .desc-area .dimd", 0.5, {opacity: 0.6})
      .to(".sol-wrap .desc-area .inner", 2, {y: 0, opacity: 1}, "<+=0.5")
      .to(".sol-wrap .desc-area .inner .desc", 2, {y: -386})
      .to({}, {duration: 0.5});


      // solution swiper
      gsap.to(".sol-swiper-wrap .sol-swiper .swiper-slide", 0.7, {
        scrollTrigger: {
          trigger: ".sol-swiper-wrap",
          start: "top 40%",
          end: "bottom bottom"
        },
        x: 0,
        opacity: 1,
        stagger: 0.1,
        ease: Power3.inOut
      });

      gsap.to(".sol-swiper-wrap .sol-swiper .swiper-util", 2, {
        scrollTrigger: {
          trigger: ".sol-swiper-wrap .sol-swiper .swiper-util",
          start: "top 90%",
          end: "bottom top"
        },
        opacity: 1,
        ease: Power4.easeOut
      });

      const solSwiper = new Swiper(".sol-swiper", {
        observer: true,
        observeParents: true,
        speed: 1000,
        slidesPerView: 1.5,
        spaceBetween: 24,
        pagination: {
          el: ".sol-swiper .swiper-util .swiper-pagination",
        },
        on: {
          init: function () {
            $(".sol-swiper .swiper-util .current").text(`0${this.activeIndex + 1}`);
            $(".sol-swiper .swiper-util .total").text(`0${this.slides.length}`);
          },
          slideChange: function () {
            $(".sol-swiper .swiper-util .current").text(`0${this.activeIndex + 1}`);
          },
          reachEnd: function () {
            $(".sol-swiper .swiper-util .current").text(`0${this.slides.length}`);
          },
          fromEdge: function () {
            $(".sol-swiper .swiper-util .current").text(`0${this.activeIndex + 1}`);
          }
        }
      });

      $(".sol-swiper .swiper-wrapper, .sol-swiper .swiper-util > a").on("click", function () {
        solSwiper.slideNext();
      });

      // footprint
      gsap.to("body", {
        scrollTrigger: {
          trigger: ".fp-wrap",
          start: "top bottom",
          end: "bottom bottom"
        },
        backgroundColor: "#fff"
      });

      gsap.to(".fp-wrap .inner img", 1, {
        scrollTrigger: {
          trigger: ".fp-wrap",
          start: "top 60%",
          end: "bottom bottom"
        },
        y: 0,
        opacity : 1,
        ease: Power4.easeOut
      });

      const fpTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".fp-wrap .img-area",
          start: "top top",
          end: "+=600%",
          pin: true,
          pinSpacing: true,
          scrub: 1
        }
      });

      fpTl.to({}, {duration: 0.5})
      .to(".fp-wrap .img-area > div.center", 1.5, {width: "100vw", height: "100vh"})
      .to(".fp-wrap .img-area > div.left", 1.5, {left: "calc(-50vw + 292px)", opacity: 0.5}, "<")
      .to(".fp-wrap .img-area > div.right", 1.5, {right: "calc(-50vw + 292px)", opacity: 0.5}, "<")
      .to(".fp-wrap .img-area > div.center .bg-box .dimd", 1, {opacity: 0.5})
      .to(".fp-wrap .img-area > div.center .tit-box img", 1, {y: 0, opacity: 1, stagger: 0.2})
      .to({}, {duration: 0.5});


      // products
      gsap.to(".prod-wrap .bg-area", 1, {
        scrollTrigger: {
          trigger: ".prod-wrap",
          start: "top 45%",
          end: "bottom bottom"
        },
        top: "50%",
        opacity: 1
      });

      const prodTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".prod-wrap",
          start: "top top",
          end: "+=1000%",
          pin: true,
          pinSpacing: true,
          scrub: 1
        }
      });

      prodTl.to({}, {duration: 0.5})
      .to(".prod-wrap .bg-area", 2, {width: "100vw", height: "100vh"})
      .to(".prod-wrap .bg-area .dimd", 2, {opacity: 0.5}, "<")
      .to(".prod-wrap .conts-area .left .tit", 1, {y: 0, opacity: 1})
      .to(".prod-wrap .conts-area .left .input-box", 1, {y: 0, opacity: 1}, "<+=0.1")
      .to(".prod-wrap .conts-area .left .btn", 1, {opacity: 1}, "<+=0.1")
      .to(".prod-wrap .conts-area .right img:first-of-type", 1.5, {opacity: 1}, "<+=0.1")
      .to(".prod-wrap .conts-area .right img:first-of-type", 3, {top: "-900px"})
      .to(".prod-wrap .conts-area .right img:nth-of-type(2)", 1.5, {opacity: 1}, "<")
      .to(".prod-wrap .conts-area .right img:nth-of-type(2)", 5, {top: "-900px"}, "<+=0.6")
      .to(".prod-wrap .conts-area .right img:last-of-type", 1.5, {opacity: 1}, "<")
      .to(".prod-wrap .conts-area .right img:last-of-type", 7, {top: "-900px"}, "<+=0.6");


      // sustainability
      const sustainIntroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".sustain-wrap .sustain-intro-area",
          start: "top 30%",
          end: "bottom bottom"
        }
      });

      sustainIntroTl.to(".sustain-wrap .sustain-intro-area p .tit1", 1, {y: 0, ease: Power4.easeOut})
      .to(".sustain-wrap .sustain-intro-area p .tit2", 1, {y: 0, ease: Power4.easeOut}, "<+=0.2")
      .to(".sustain-wrap .sustain-intro-area p .tit3", 1, {y: 0, ease: Power4.easeOut}, "<");

      const sustainListTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".sustain-wrap",
          start: "top top",
          end: "+=1000%",
          pin: true,
          pinSpacing: true,
          scrub: 1
        }
      });

      sustainListTl.to({}, {duration: 0.3})
      .to(".sustain-wrap .sustain-intro-area .txt-box > p", 0.7, {marginBottom: 80})
      .to(".sustain-wrap .sustain-intro-area .txt-box > div p:first-of-type", 0.7, {x: -140}, "<")
      .to(".sustain-wrap .sustain-intro-area .txt-box > div p:last-of-type", 0.7, {x: 140}, "<")
      .to(".sustain-wrap .sustain-list-area .list-item.item1", 0.7, {scale: 1}, "<")
      .to({}, {duration: 0.3})
      .to(".sustain-wrap .sustain-list-area .list-item.item1", 0.7, {top: 60, left: 60, width: 888, height: 560})
      .to(".sustain-wrap .sustain-intro-area", 0.3, {opacity: 0}, "<")
      .to(".sustain-wrap .sustain-list-area .list-item.item1 .list-txt-box img", 0.3, {y: 0, opacity: 1, stagger: 0.2})
      .to(".sustain-wrap .sustain-list-area .list-item.item2", 0.5, {y: 0, ease: "power2.inOut", onComplete: function () {
        $(".sustain-wrap .sustain-list-area .list-item.item2").css("pointer-events", "initial");
      }})
      .to(".sustain-wrap .sustain-list-area .list-item.item3", 0.5, {y: 0, ease: "power2.inOut"}, "<+=0.2")
      .to(".sustain-wrap .sustain-list-area .list-item.item4", 0.5, {y: 0, ease: "power2.inOut", onComplete: function () {
        $(".sustain-wrap .sustain-list-area .list-item.item4").css("pointer-events", "initial");
      }}, "<+=0.2")
      .to(".sustain-wrap .sustain-list-area .list-item.item5", 0.5, {y: 0, ease: "power2.inOut"}, "<+=0.2")
      .to(".sustain-wrap .sustain-list-area .inner", 0.7, {top: "calc(-1848px + 100vh)"}, "<+=0.2")
      .to(".sustain-wrap .sustain-list-area .list-item.item6", 0.5, {y: 0, ease: "power2.inOut"}, "<+=0.2")
      .to(".sustain-wrap .sustain-list-area .list-item.item7", 0.5, {y: 0, ease: "power2.inOut", onComplete: function () {
        $(".sustain-wrap .sustain-list-area .list-item.item7").css("pointer-events", "initial");
      }}, "<+=0.2")
      .to(".sustain-wrap .sustain-list-area .list-item.item8", 0.5, {y: 0, ease: "power2.inOut"}, "<+=0.2");


      // partnership, media
      function partMediaGsapFn(el) {
        const $el = $(el);
        const baseAttribute = {
          duration: 1.3,
          y: 0,
          opacity: 1,
          stagger: 0.2,
          ease: Power4.easeOut,
          scrollTrigger: {
            start: "top 80%",
            end: "bottom bottom"
          }
        }

        gsap.to($el.find(".tit-area img"), {
          ...baseAttribute,
          scrollTrigger: {
            ...baseAttribute.scrollTrigger,
            trigger: $el.find(".tit-area")
          }
        });

        gsap.to($el.find(".list-area .list-item"), {
          ...baseAttribute,
          scrollTrigger: {
            ...baseAttribute.scrollTrigger,
            trigger: $el.find(".list-area")
          }
        });
      }

      partMediaGsapFn(".part-wrap");
      partMediaGsapFn(".media-wrap");


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

      $(".floating-btn-wrap .plus a").on("click", function () {
        if ($(this).closest(".plus").hasClass("active")) {
          $(this).closest(".plus").removeClass("active");
        } else {
          $(this).closest(".plus").addClass("active");
        }
      });

      $(".floating-btn-wrap .go-top").on("click", function () {
        $("html, body").animate({scrollTop: 0}, 1000);
      });
    }
  }
})();
