$(function() {
  gsap.registerPlugin(ScrollTrigger);
  main.common();
});

const main = (function () {
  return {
    common () {
      // header
      var _prevScrl = 0;
      var _currentScrl;

      $(window).on("scroll", function () {
        _currentScrl = $(window).scrollTop();

        if (_currentScrl === 0) {
          gsap.to($("header"), { y: 0, duration: 0.5 });
          $("header").removeClass("c");
        } else {
          if (_currentScrl > _prevScrl) {
            gsap.to($("header"), { y: -100, duration: 0.5 });
            setTimeout(function () {
              $("header").addClass("c");
            }, 600);
          } else {
            gsap.to($("header"), { y: 0, duration: 0.5 });
          }
        }

        _prevScrl = _currentScrl;
      });


      // main con 1
      const mainCon1Tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".main-con1",
          start: "top 60%",
          end: "bottom top"
        }
      });

      mainCon1Tl.to(".main-con1 .left img", {y: 0, opacity: 1, ease: Power1.easeOut})
      .to(".main-con1 .left .line", {width: "213px"})
      .to(".main-con1 .right .sub-tit-wrap p:first-of-type", {y: 0, opacity: 1, ease: Power1.easeOut})
      .to(".main-con1 .right .sub-tit-wrap p:nth-of-type(2)", {y: 0, opacity: 1, ease: Power1.easeOut}, "<+=0.2")
      .to(".main-con1 .right .sub-tit-wrap p:nth-of-type(3)", {y: 0, opacity: 1, ease: Power1.easeOut}, "<+=0.2")
      .to(".main-con1 .right .sub-tit-wrap p:last-of-type", {y: 0, opacity: 1, ease: Power1.easeOut}, "<+=0.2")
      .to(".main-con1 .right > img:first-of-type", {y: 0, opacity: 1, ease: Power1.easeOut}, "<+=0.2")
      .to(".main-con1 .right > img:last-of-type", {y: 0, opacity: 1, ease: Power1.easeOut}, "<+=0.2");


      // main con 2
      gsap.to(".main-con2 .box-wrap .box-item", {
        scrollTrigger: {
          trigger: ".main-con2 .box-wrap",
          start: "top 60%",
          end:"bottom bottom"
        },
        y: 0,
        opacity: 1,
        stagger: 0.2,
        ease: Power1.easeOut
      });

      const mainCon2Tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".main-con2",
          start: "top top",
          end: "+=450%",
          pin: true,
          pinSpacing: false,
          scrub: 1
        }
      });

      mainCon2Tl.to(".main-con2 .box-wrap .box-item:nth-child(2)", {marginTop: 0})
      .to(".main-con2 .bg img:first-of-type", {y: "-70%"})
      .to(".main-con2 .bg img:last-of-type", {y: "-200%"}, "<")
      .to(".main-con2 .box-wrap", {y: "-100%"}, "<+=0.2")
      .to({}, { duration: 0.1 });


      // main con 3
      let marqueeTween;
      const $imgArea = document.querySelector(".main-con3 .marquee");

      $imgArea.innerHTML += $imgArea.innerHTML;

      function marqueeFn () {
        if (marqueeTween) marqueeTween.kill();

        gsap.set($imgArea, { x: 0 });

        const itemsWidth = $imgArea.scrollWidth / 2;

        marqueeTween = gsap.to($imgArea, {
          x: -itemsWidth,
          duration: 30,
          ease: "none",
          repeat: -1
        });
      }

      window.addEventListener("load", marqueeFn);

      gsap.to(".main-con3 .box-wrap .box-item", {
        scrollTrigger: {
          trigger: ".main-con3",
          start: "top 50%",
          end:"bottom bottom"
        },
        y: 0,
        opacity: 1,
        ease: Power1.easeOut,
        stagger: 0.2,
      });


      // main con 4
      gsap.to(".main-con4 .tit", 1, {
        scrollTrigger: {
          trigger: ".main-con4",
          start: "top 60%",
          end: "bottom top",
        },
        scale: 1,
        opacity: 1,
        ease: Power1.easeOut
      });

      $(".main-con4 .scrl-motion").each(function (smIdx, smEl) {
        gsap.to(smEl, {
          scrollTrigger: {
            trigger: smEl,
            start: "top 70%",
            end:"bottom top",
            onEnter: function () {
              if ($(smEl).hasClass("nav-wrap")) {
                $(smEl).addClass("active");
              } else {
                gsap.to(smEl, 1, {
                  opacity: 1,
                  y: 0,
                  ease: Power1.easeOut
                });
              }
            }
          },
        });
      });

      $(".main-con4 .nav-wrap a").hover(function () {
        $(".main-con4 .nav-wrap a").removeClass("active");
        $(this).addClass("active");
      });

      gsap.to(".main-con4 .bg img", {
        scrollTrigger: {
          trigger: ".main-con4 .bg",
          start: "top center",
          end: "bottom center",
          scrub: 2
        },
        y: "-100px"
      });


      // main con 5
      const mainCon5Tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".main-con5",
          start: "top 40%",
          end: "bottom center"
        }
      });

      mainCon5Tl.to(".main-con5 .tit-wrap .tit", {y: 0, opacity: 1, ease: Power1.easeOut})
      .to(".main-con5 .util-wrap", {y: 0, opacity: 1, ease: Power1.easeOut}, "<")
      .to(".main-con5 .btn-wrap", {y: 0, opacity: 1, ease: Power1.easeOut}, "<")
      .to(".main-con5 .tit-wrap .txt", {y: 0, opacity: 1, ease: Power1.easeOut}, "<+=0.2")
      .to(".main-con5 .tit-wrap .btn", {y: 0, opacity: 1, ease: Power1.easeOut}, "<+=0.2");

      ScrollTrigger.create({
        trigger: ".main-con5",
        start: "top top",
        end:"+=100%",
        pin: true
      });

      $(".main-con5 .util-wrap a.util-item").on("click", function () {
        $(".main-con5 .util-wrap").addClass("active");
        $(".main-con5 .btn-wrap img").removeClass("active");
        $(".main-con5 .btn-wrap img.sec").addClass("active");
        $(".main-con5 .vid-wrap video").removeClass("active");
        $(".main-con5 .vid-wrap video.sec").addClass("active");

        setTimeout(function () {
          $('.main-con5 .vid-wrap video.sec').get(0).play();
        }, 500);
      });

      $(".main-con5 .btn-wrap img.sec").on("click", function () {
        $(".main-con5 .util-wrap").removeClass("active");
        $(".main-con5 .btn-wrap img").removeClass("active");
        $(".main-con5 .btn-wrap img.fir").addClass("active");
        $(".main-con5 .vid-wrap video").removeClass("active");
        $(".main-con5 .vid-wrap video.fir").addClass("active");

        setTimeout(function () {
          $('.main-con5 .vid-wrap video.sec').get(0).currentTime = 0;
          $('.main-con5 .vid-wrap video.sec').get(0).load();
        }, 500);
      });


      // main con 6
      gsap.to(".main-con6 .scrl-motion", {
        scrollTrigger: {
          trigger: ".main-con6",
          start: "top 45%",
          end:"bottom bottom"
        },
        y: 0,
        opacity: 1,
        stagger: 0.2,
        ease: Power1.easeOut
      });


      // main con 7
      $(".main-con7 .scrl-motion").each(function (smIdx, smEl) {
        gsap.to(smEl, {
          scrollTrigger: {
            trigger: smEl,
            start: "top 80%",
            end:"bottom top",
            onEnter: function () {
              gsap.to(smEl, {
                opacity: 1,
                y: 0,
                delay: 0.2 * smIdx,
                ease: Power1.easeOut
              });
              $(smEl).addClass("active");
            }
          },
        });
      });


      // main con 8
      gsap.to(".main-con8 .scrl-motion", {
        scrollTrigger: {
          trigger: ".main-con8",
          start: "top 70%",
          end:"bottom bottom"
        },
        y: 0,
        opacity: 1,
        stagger: 0.2,
        ease: Power1.easeOut
      });
    }
  }
})();
