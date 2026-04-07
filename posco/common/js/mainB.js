var _this_scroll;
var _isScrollTop;
var _isDone = false;

$(window).on("load", function () {
  gsap.registerPlugin(ScrollToPlugin);
  main.common();
});

var _getScrollObjY = function () {
  var _arrY = [];
  $(".scroll-motion").each(function (q) {
    var elementTopOffset = parseInt($(".scroll-motion").eq(q).offset().top);
    var additionalOffset = $(window).height() / 10 + 300;
    _arrY.push(elementTopOffset + additionalOffset);
  });

  return _arrY;
};

const main = (function () {
  return {
    common () {
      $(window).on('scroll', function(){
         $(".scroll-motion").each(function (q) {
          if ($(window).scrollTop() + $(window).height() > _getScrollObjY()[q]) {
            $(".scroll-motion").eq(q).addClass("active");
          }
        });

        if($(window).scrollTop() > 100){
          gsap.to("header", { top: -100, duration: 0.7, ease: Power3.easeOut });
        } else {
          gsap.to("header", { top: 0, duration: 0.7, ease: Power3.easeOut });
        }
      });

      // header
      gsap.to($("header"), { top: 0, duration: 0.7, delay: 1.2, ease: Power3.easeOut });

      $("header .inner a.gnb").hover(function () {
        gsap.to($("header"), { background: 'rgba(255, 255, 255, 1)', duration: 0.5, ease: Power3.easeOut });
        gsap.to($("header .w"), { opacity: 0, duration: 0.5, ease: Power3.easeOut });
        gsap.to($("header .c"), { opacity: 1, duration: 0.5, ease: Power3.easeOut });
        $("header .inner a.gnb .twod").stop().slideDown(350);
      }, function () {
        gsap.to($("header"), { background: 'rgba(255, 255, 255, 0)', duration: 0.5, ease: Power3.easeOut });
        gsap.to($("header .w"), { opacity: 1, duration: 0.5, ease: Power3.easeOut });
        gsap.to($("header .c"), { opacity: 0, duration: 0.5, ease: Power3.easeOut });
        $("header .inner a.gnb .twod").stop().slideUp(350);
      });

      $("header .inner a.gnb .twod").hover(function () {
        gsap.to($("header .inner a.gnb .thrd"), { left: 202, duration: 0.5, ease: Power3.easeOut });
      }, function () {
        gsap.to($("header .inner a.gnb .thrd"), { left: 0, duration: 0.5, ease: Power3.easeOut });
      });

      $("header .inner .util .one").on('click', function () {
        $(".dimd").fadeIn(500);
        gsap.to($(".fam-pop"), { right: 0, duration: 1, ease: Power3.easeOut });
      });

      $(".fam-pop a").on("click", function () {
        $(".dimd").fadeOut(500);
        gsap.to($(".fam-pop"), { right: "-100%", duration: 4.5, ease: Power3.easeOut });
      });

      $("header .inner .util .two").on('click', function () {
        $(".dimd").fadeIn(500);
        gsap.to($("header"), { top: 600, duration: 1, ease: Power3.easeInOut });
        gsap.to($(".info-pop"), { top: 0, boxShadow: "0 20px 20px 0 rgba(0, 0, 0, .45)", duration: 1, ease: Power3.easeInOut });
        gsap.to($(".info-pop .xbt"), { bottom: -60, opacity: 1, duration: 1, ease: Power3.easeInOut });
        gsap.to($(".mainvisual .top"), { transform: 'translate(0, 600px)', duration: 1, ease: Power3.easeInOut });
      });

      $(".info-pop .xbt").on('click', function () {
        $(".dimd").fadeOut(500);
        gsap.to($("header"), { top: 0, duration: 1, ease: Power3.easeInOut });
        gsap.to($(".info-pop"), { top: -600, boxShadow: "initial", duration: 1, ease: Power3.easeInOut });
        gsap.to($(".info-pop .xbt"), { bottom: 0, opacity: 0, duration: 1, ease: Power3.easeInOut });
        gsap.to($(".mainvisual .top"), { transform: 'translate(0, 0)', duration: 1, ease: Power3.easeInOut });
      });

      $(".dimd").on("click", function () {
        $(".dimd").fadeOut(500);
        gsap.to($("header"), { top: 0, duration: 1, ease: Power3.easeInOut });
        gsap.to($(".fam-pop"), { right: "-100%", duration: 4.5, ease: Power3.easeOut });
        gsap.to($(".info-pop"), { top: -600, boxShadow: "initial", duration: 1, ease: Power3.easeInOut });
        gsap.to($(".info-pop .xbt"), { bottom: 0, opacity: 0, duration: 1, ease: Power3.easeInOut });
        gsap.to($(".mainvisual .top"), { transform: 'translate(0, 0)', duration: 1, ease: Power3.easeInOut });
      });


      // main visual
      function slideTxtMotion(slide) {
        const left = $(slide).find(".txt-wrap .left");
        const right = $(slide).find(".txt-wrap .right");

        gsap.to(left, { transform: 'translate(0, -50%)', duration: 0.7, delay: 1.2, opacity: 1, ease: Power3.easeOut });
        gsap.to(right, { transform: 'translate(0, -50%)', duration: 0.7, delay: 1.2, opacity: 1, ease: Power3.easeOut });
      }

      slideTxtMotion($(".mainv-swiper .swiper-slide:first-child"));

      gsap.to($(".mainvisual .mainv-swiper .swiper-util .btn-wrap"), { transform: 'translate(0, -50%)', duration: 0.7, opacity: 1, delay: 1.2, ease: Power3.easeOut });

      gsap.to($(".mainvisual .top .bottom-txt .posco p").eq(0), { transform: 'translate(0, 0)', duration: 0.7, opacity: 1, ease: Power3.easeInOut });
      gsap.to($(".mainvisual .top .bottom-txt .posco p").eq(1), { transform: 'translate(0, 0)', duration: 0.7, opacity: 1, delay: 0.1, ease: Power3.easeInOut });
      gsap.to($(".mainvisual .top .bottom-txt .posco p").eq(2), { transform: 'translate(0, 0)', duration: 0.7, opacity: 1, delay: 0.2, ease: Power3.easeInOut });
      gsap.to($(".mainvisual .top .bottom-txt .posco p").eq(3), { transform: 'translate(0, 0)', duration: 0.7, opacity: 1, delay: 0.3, ease: Power3.easeInOut });
      gsap.to($(".mainvisual .top .bottom-txt .posco p").eq(4), { transform: 'translate(0, 0)', duration: 0.7, opacity: 1, delay: 0.4, ease: Power3.easeInOut });
      gsap.to($(".mainvisual .top .bottom-txt .posco p").eq(5), { transform: 'translate(0, 0)', duration: 0.7, opacity: 1, delay: 0.5, ease: Power3.easeInOut });
      gsap.to($(".mainvisual .top .bottom-txt .holdings p").eq(0), { transform: 'translate(0, 0)', duration: 0.7, opacity: 1, delay: 0.6, ease: Power3.easeInOut });
      gsap.to($(".mainvisual .top .bottom-txt .holdings p").eq(1), { transform: 'translate(0, 0)', duration: 0.7, opacity: 1, delay: 0.7, ease: Power3.easeInOut });
      gsap.to($(".mainvisual .top .bottom-txt .holdings p").eq(2), { transform: 'translate(0, 0)', duration: 0.7, opacity: 1, delay: 0.8, ease: Power3.easeInOut });
      gsap.to($(".mainvisual .top .bottom-txt .holdings p").eq(3), { transform: 'translate(0, 0)', duration: 0.7, opacity: 1, delay: 0.9, ease: Power3.easeInOut });
      gsap.to($(".mainvisual .top .bottom-txt .holdings p").eq(4), { transform: 'translate(0, 0)', duration: 0.7, opacity: 1, delay: 1, ease: Power3.easeInOut });
      gsap.to($(".mainvisual .top .bottom-txt .holdings p").eq(5), { transform: 'translate(0, 0)', duration: 0.7, opacity: 1, delay: 1.1, ease: Power3.easeInOut });
      gsap.to($(".mainvisual .top .bottom-txt .holdings p").eq(6), { transform: 'translate(0, 0)', duration: 0.7, opacity: 1, delay: 1.2, ease: Power3.easeInOut });
      gsap.to($(".mainvisual .top .bottom-txt .holdings p").eq(7), { transform: 'translate(0, 0)', duration: 0.7, opacity: 1, delay: 1.3, ease: Power3.easeInOut });

      const mainSwiper = new Swiper(".mainv-swiper", {
        speed: 1000,
        navigation: {
          nextEl: ".mainv-swiper .swiper-button-next",
          prevEl: ".mainv-swiper .swiper-button-prev",
        },
        on: {
          slideChangeTransitionEnd: function () {
            gsap.set(".mainvisual .txt-wrap img", { clearProps: "all" });
          },
          slideChangeTransitionStart: function () {
            slideTxtMotion($(".mainv-swiper .swiper-slide-active"));
          }
        }
      });


      // main con 1
      let tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: ".maincon1",
          start: "top top",
          end: "+=450%",
          pin: true,
          scrub: 1,
          pinSpacing: true
        }
      });
      tl1.to(
        ".maincon1 .video",
        {
          transform: 'translate(0, 0)',
          duration: 1,
          ease: "power3.inOut"
        },
       "<"
      );
      tl1.to(
        ".maincon1 .tit2",
        {
          opacity: 1,
          duration: 1,
          ease: "power3.inOut"
        },
       "<"
      );
      tl1.to(
        ".maincon1 .lists",
        {
          top: 'calc(50% + -3134px)',
          duration: 3,
        },
      );

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".maincon1 .video",
          start: "top top",
          end: "+=500%",
          scrub: true,
        }
      });


      // main con 2
      $(".maincon2 .tit .bts > a").eq(1).on('click', function () {
        $(".maincon2 .tit .bts > a").eq(0).addClass("active");
        $(".maincon2 .tit .bts > a").eq(1).removeClass("active");
        gsap.to($(".maincon2 .lists .list-inner"), { transform: 'translate(-1138px, 0)', duration: 1, ease: Power3.easeInOut });
      });
      $(".maincon2 .tit .bts > a").eq(0).on('click', function () {
        $(".maincon2 .tit .bts > a").eq(1).addClass("active");
        $(".maincon2 .tit .bts > a").eq(0).removeClass("active");
        gsap.to($(".maincon2 .lists .list-inner"), { transform: 'translate(0, 0)', duration: 1, ease: Power3.easeInOut });
      });


      // main con 3
      let tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: ".maincon3",
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
          pinSpacing: true
        }
      });
      tl3.to({}, {}, "+=0.5");
      tl3.to(
        ".maincon3 .inner",
        {
          background: '#11348B',
          duration: 1,
          ease: "power3.inOut"
        },
      );
      tl3.to(
        ".maincon3 .inner .gra-area",
        {
          opacity: 1,
          duration: 1,
          ease: "power3.inOut"
        },
        "<"
      );
      tl3.to(
        ".maincon3 .inner .txt1 > img.off",
        {
          opacity: 0,
          duration: 1,
          ease: "power3.inOut"
        },
        "<"
      );
      tl3.to(
        ".maincon3 .inner .txt1 > img.on",
        {
          opacity: 1,
          duration: 1,
          ease: "power3.inOut"
        },
       "<"
      );
      tl3.to({}, {}, "+=0.1");
      tl3.to(
        ".maincon3 .inner .txt1",
        {
          top: 120,
          duration: 1,
          ease: "power3.inOut"
        },
      );
      tl3.to(
        ".maincon3 .inner .txt2",
        {
          width: 266,
          top: 168,
          duration: 1,
          ease: "power3.inOut"
        },
       "<"
      );
      tl3.to(
        ".maincon3 .inner .bg",
        {
          width: 2000,
          height: 2000,
          left: "50%",
          top: 380,
          opacity: 0.7,
          duration: 1,
          ease: "power3.inOut"
        },
       "<"
      );
       tl3.to(
        ".maincon3 .inner .desc-area",
        {
          opacity: 1,
          top: 377,
          duration: 1,
          ease: "power3.inOut"
        },
      );
      tl3.to(
        ".maincon3 .inner .txt-area",
        {
          opacity: 1,
          bottom: 120,
          duration: 1,
          ease: "power3.inOut"
        },
        "<+0.4"
      );

      var maincon3tab = 0;

      $(".maincon3 .inner .tab > a").on('click', function () {
        if (maincon3tab == 0) {
          gsap.to($(".maincon3 .inner .tab > a > img.off"), { opacity: 0, duration: 0.5, ease: Power3.easeOut });
          gsap.to($(".maincon3 .inner .tab > a > img.on"), { opacity: 1, duration: 0.5, ease: Power3.easeOut });

          gsap.to($(".maincon3 .inner .tab-area .tabcon").eq(maincon3tab).find("p").eq(0), { transform: 'translate(0, -100px)', opacity: 0, duration: 0.5, ease: Power3.easeOut });
          gsap.to($(".maincon3 .inner .tab-area .tabcon").eq(maincon3tab).find("p").eq(1), { transform: 'translate(0, -100px)', opacity: 0, duration: 0.5, ease: Power3.easeOut });
          gsap.to($(".maincon3 .inner .tab-area .tabcon").eq(maincon3tab).find("p").eq(2), { transform: 'translate(0, -100px)', opacity: 0, duration: 0.5, ease: Power3.easeOut });
          gsap.to($(".maincon3 .inner .tab-area .tabcon").eq(maincon3tab).find("p").eq(3), { transform: 'translate(0, -100px)', opacity: 0, duration: 0.5, ease: Power3.easeOut });
          maincon3tab = 1;
          gsap.to($(".maincon3 .inner .tab-area .tabcon").eq(maincon3tab).find("p").eq(0), { transform: 'translate(0, 100px)', opacity: 0, duration: 0, ease: Power3.easeOut });
          gsap.to($(".maincon3 .inner .tab-area .tabcon").eq(maincon3tab).find("p").eq(1), { transform: 'translate(0, 100px)', opacity: 0, duration: 0, ease: Power3.easeOut });
          gsap.to($(".maincon3 .inner .tab-area .tabcon").eq(maincon3tab).find("p").eq(2), { transform: 'translate(0, 100px)', opacity: 0, duration: 0, ease: Power3.easeOut });
          gsap.to($(".maincon3 .inner .tab-area .tabcon").eq(maincon3tab).find("p").eq(3), { transform: 'translate(0, 100px)', opacity: 0, duration: 0, ease: Power3.easeOut });
          gsap.to($(".maincon3 .inner .tab-area .tabcon").eq(maincon3tab).find("p").eq(0), { transform: 'translate(0, 0)', opacity: 1, delay: 0.6, duration: 0.5, ease: Power3.easeOut });
          gsap.to($(".maincon3 .inner .tab-area .tabcon").eq(maincon3tab).find("p").eq(1), { transform: 'translate(0, 0)', opacity: 1, delay: 0.7, duration: 0.5, ease: Power3.easeOut });
          gsap.to($(".maincon3 .inner .tab-area .tabcon").eq(maincon3tab).find("p").eq(2), { transform: 'translate(0, 0)', opacity: 1, delay: 0.8, duration: 0.5, ease: Power3.easeOut });
          gsap.to($(".maincon3 .inner .tab-area .tabcon").eq(maincon3tab).find("p").eq(3), { transform: 'translate(0, 0)', opacity: 1, delay: 0.9, duration: 0.5, ease: Power3.easeOut });
        } else {
          gsap.to($(".maincon3 .inner .tab > a > img.off"), { opacity: 1, duration: 0.5, ease: Power3.easeOut });
          gsap.to($(".maincon3 .inner .tab > a > img.on"), { opacity: 0, duration: 0.5, ease: Power3.easeOut });

          gsap.to($(".maincon3 .inner .tab-area .tabcon").eq(maincon3tab).find("p").eq(0), { transform: 'translate(0, -100px)', opacity: 0, duration: 0.5, ease: Power3.easeOut });
          gsap.to($(".maincon3 .inner .tab-area .tabcon").eq(maincon3tab).find("p").eq(1), { transform: 'translate(0, -100px)', opacity: 0, duration: 0.5, ease: Power3.easeOut });
          gsap.to($(".maincon3 .inner .tab-area .tabcon").eq(maincon3tab).find("p").eq(2), { transform: 'translate(0, -100px)', opacity: 0, duration: 0.5, ease: Power3.easeOut });
          gsap.to($(".maincon3 .inner .tab-area .tabcon").eq(maincon3tab).find("p").eq(3), { transform: 'translate(0, -100px)', opacity: 0, duration: 0.5, ease: Power3.easeOut });
          maincon3tab = 0;
          gsap.to($(".maincon3 .inner .tab-area .tabcon").eq(maincon3tab).find("p").eq(0), { transform: 'translate(0, 100px)', opacity: 0, duration: 0, ease: Power3.easeOut });
          gsap.to($(".maincon3 .inner .tab-area .tabcon").eq(maincon3tab).find("p").eq(1), { transform: 'translate(0, 100px)', opacity: 0, duration: 0, ease: Power3.easeOut });
          gsap.to($(".maincon3 .inner .tab-area .tabcon").eq(maincon3tab).find("p").eq(2), { transform: 'translate(0, 100px)', opacity: 0, duration: 0, ease: Power3.easeOut });
          gsap.to($(".maincon3 .inner .tab-area .tabcon").eq(maincon3tab).find("p").eq(3), { transform: 'translate(0, 100px)', opacity: 0, duration: 0, ease: Power3.easeOut });
          gsap.to($(".maincon3 .inner .tab-area .tabcon").eq(maincon3tab).find("p").eq(0), { transform: 'translate(0, 0)', opacity: 1, delay: 0.6, duration: 0.5, ease: Power3.easeOut });
          gsap.to($(".maincon3 .inner .tab-area .tabcon").eq(maincon3tab).find("p").eq(1), { transform: 'translate(0, 0)', opacity: 1, delay: 0.7, duration: 0.5, ease: Power3.easeOut });
          gsap.to($(".maincon3 .inner .tab-area .tabcon").eq(maincon3tab).find("p").eq(2), { transform: 'translate(0, 0)', opacity: 1, delay: 0.8, duration: 0.5, ease: Power3.easeOut });
          gsap.to($(".maincon3 .inner .tab-area .tabcon").eq(maincon3tab).find("p").eq(3), { transform: 'translate(0, 0)', opacity: 1, delay: 0.9, duration: 0.5, ease: Power3.easeOut });
        }
      });


      // main con 4
      $(".maincon4 .lists > a").eq(0).hover(function () {
        gsap.to($(".maincon4 .lists > a").eq(0).find(".off"), { left: 480, opacity: 0, duration: 0.7, ease: Power3.easeOut });
        gsap.to($(".maincon4 .lists > a").eq(0).find(".icon > .w"), { opacity: 0, duration: 0.7, ease: Power3.easeOut });
        gsap.to($(".maincon4 .lists > a").eq(0).find(".icon > .c"), { opacity: 1, duration: 0.7, ease: Power3.easeOut });
        gsap.to($(".maincon4 .lists > a").eq(1).find(".off"), { left: 480, opacity: 0, duration: 0.7, delay: 0.1, ease: Power3.easeOut });
        gsap.to($(".maincon4 .lists > a").eq(1).find(".txt1"), { opacity: 0, duration: 0.7, ease: Power3.easeOut });
        gsap.to($(".maincon4 .lists > a").eq(1).find(".txt2"), { opacity: 0, duration: 0.7, ease: Power3.easeOut });
        gsap.to($(".maincon4 .lists > a").eq(2).find(".off"), { left: 480, opacity: 0, duration: 0.7, delay: 0.2, ease: Power3.easeOut });
        gsap.to($(".maincon4 .lists > a").eq(2).find(".txt1"), { opacity: 0, duration: 0.7, ease: Power3.easeOut });
        gsap.to($(".maincon4 .lists > a").eq(2).find(".txt2"), { opacity: 0, duration: 0.7, ease: Power3.easeOut });
      }, function () {
        gsap.to($(".maincon4 .lists > a").eq(0).find(".off"), { left: 0, opacity: 1, duration: 0.7, ease: Power3.easeOut });
        gsap.to($(".maincon4 .lists > a").eq(0).find(".icon > .w"), { opacity: 1, duration: 0.7, ease: Power3.easeOut });
        gsap.to($(".maincon4 .lists > a").eq(0).find(".icon > .c"), { opacity: 0, duration: 0.7, ease: Power3.easeOut });
        gsap.to($(".maincon4 .lists > a").eq(1).find(".off"), { left: 0, opacity: 1, duration: 0.7, ease: Power3.easeOut });
        gsap.to($(".maincon4 .lists > a").eq(2).find(".off"), { left: 0, opacity: 1, duration: 0.7, ease: Power3.easeOut });
        gsap.to($(".maincon4 .lists > a").eq(1).find(".txt1"), { opacity: 1, duration: 0.7, ease: Power3.easeOut });
        gsap.to($(".maincon4 .lists > a").eq(1).find(".txt2"), { opacity: 1, duration: 0.7, ease: Power3.easeOut });
        gsap.to($(".maincon4 .lists > a").eq(2).find(".txt1"), { opacity: 1, duration: 0.7, ease: Power3.easeOut });
        gsap.to($(".maincon4 .lists > a").eq(2).find(".txt2"), { opacity: 1, duration: 0.7, ease: Power3.easeOut });
      });


      // main con 5
      ScrollTrigger.create({
        trigger: ".maincon5",
        start: "top top",
        end: "bottom top",
        pin: true,
        scrub: 1,
        pinSpacing: true,
        onEnter: function () {
          $(".maincon5").addClass("active");
        }
      });

      gsap.to(".maincon5 .inner img", .7, {
        scrollTrigger: {
          trigger: ".maincon5",
          start: "top 25%",
          end: "top top"
        },
        opacity: 1,
        y: 0,
        stagger: 0.2,
        ease: Power3.easeOut
      });
    }
  }
})();
