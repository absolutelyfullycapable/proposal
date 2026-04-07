$(function() {
  gsap.registerPlugin(ScrollTrigger);
  sub.common();
});

const sub = (function () {
  return {
    common () {
      // scrl-motion 공통
      $(".scrl-motion").each(function (motionIdx, motionItem) {
        gsap.to($(motionItem).find(".motion"), {
          scrollTrigger: {
            trigger: motionItem,
            start: "top 60%",
            end: "bottom bottom"
          },
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.2,
          ease: Power3.inOut
        });
      });


      // tab 공통
      $(".tab-area").each(function (tabAreaIdx, tabAreaItem) {
        $(tabAreaItem).find(".tab-box a").on("click", function () {
          let tabIdx = $(this).index();

          if (!$(this).hasClass("on")) {
            $(tabAreaItem).find(".tab-box a").removeClass("on");
            $(this).addClass("on");
            $(tabAreaItem).find(".cont-box .cont-item").removeClass("on").eq(tabIdx).addClass("on");
          }
        });
      });


      // header
      let lastScrl = 0;

      $(window).on("scroll", function () {
        let currentScrl = $(window).scrollTop();

        if (lastScrl < currentScrl) {
          gsap.to("header", {
            y: -100,
            duration: 1,
            ease: Power3.easeOut
          });
        } else if (lastScrl >= currentScrl) {
          gsap.to("header", {
            y: 0,
            duration: 1,
            ease: Power3.easeOut
          });
        }

        lastScrl = currentScrl <= 0 ? 0 : currentScrl;
      });

      const vcOffsetTop = $(".value-chain").offset().top;

      $(window).on("scroll", function () {
        let currentScrl = $(window).scrollTop();

        if (currentScrl >= vcOffsetTop - 100) {
          $("header").removeClass("wht");
        } else {
          $("header").addClass("wht");
        }
      });


      // 진입, kv
      setTimeout(function () {
        gsap.to("header", {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: Power3.easeOut
        });

        $(".kv").addClass("active");

        gsap.to(".kv .motion",  {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: Power3.inOut
        });
      }, 300);

      gsap.to(".kv .dimd", {
        scrollTrigger: {
          trigger: ".value-chain",
          start: "top bottom",
          end: "top top",
          scrub: true
        },
        opacity: 0.8,
        ease: Power3.inOut
      });


      // electrolysis
      gsap.to(".electrolysis .inner .list-area > div", {
        scrollTrigger: {
          trigger: ".electrolysis .inner .list-area",
          start: "top 60%",
          end: "top top"
        },
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.2,
        ease: Power3.inOut
      });

      const elecTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".electrolysis .inner .list-area",
          start: "top top",
          end: "+=1000%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          onUpdate: (self) => {
            gsap.to(".electrolysis .inner .list-area .left .progress-box .progress-thumb", {
              width: `${Math.ceil(self.progress * 100)}%`
            })
          }
        }
      });

      elecTl.to({}, {duration: 0.5})
      .to(".electrolysis .inner .list-area .right .list-item:first-child", 1, {scale: .75})
      .to(".electrolysis .inner .list-area .right .list-item:nth-child(2)", 1, {top: 0}, "<")
      .to({}, {duration: 0.5})
      .to(".electrolysis .inner .list-area .right .list-item:nth-child(2)", 1, {scale: .75})
      .to(".electrolysis .inner .list-area .right .list-item:nth-child(3)", 1, {top: 0}, "<")
      .to({}, {duration: 0.5})
      .to(".electrolysis .inner .list-area .right .list-item:nth-child(3)", 1, {scale: .75})
      .to(".electrolysis .inner .list-area .right .list-item:last-child", 1, {top: 0}, "<")
      .to({}, {duration: 0.5});


      // core value
      gsap.to(".core-value .motion", {
        scrollTrigger: {
          trigger: ".core-value .motion",
          start: "top 60%",
          end: "bottom bottom"
        },
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.2,
        ease: Power3.inOut
      });


      // connectivity
      gsap.to(".connectivity .motion", {
        scrollTrigger: {
          trigger: ".connectivity .motion",
          start: "top 60%",
          end: "bottom bottom"
        },
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.2,
        ease: Power3.inOut
      });


      // connectivity
      gsap.to(".etc .motion", {
        scrollTrigger: {
          trigger: ".etc .motion",
          start: "top 60%",
          end: "bottom bottom"
        },
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.2,
        ease: Power3.inOut
      });


      // possibility
      gsap.to(".possibility .motion", {
        scrollTrigger: {
          trigger: ".possibility .motion",
          start: "top 60%",
          end: "bottom bottom"
        },
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.2,
        ease: Power3.inOut
      });

      $(".possibility .inner .left").on("click", function () {
        $(this).find("img").toggleClass("on");

        let possiImgIdx = $(".possibility .inner .left img.on").index();

        $(".possibility .inner .right .tab-area .tab-box a").removeClass("on").eq(possiImgIdx).addClass("on");
        $(".possibility .inner .right .tab-area .cont-item").removeClass("on").eq(possiImgIdx).addClass("on");
      });

      $(".possibility .inner .right .tab-area .tab-box a").on("click", function () {
        let possiTabIdx = $(this).index();

        $(".possibility .inner .left img").removeClass("on").eq(possiTabIdx).addClass("on");
      });
    }
  }
})();
