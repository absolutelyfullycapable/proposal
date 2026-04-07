$(function () {
  sub1Fnc.common();
});

const sub1Fnc = (function() {
  return {
    common() {
      // 페이지 진입 시 헤더 모션
      gsap.to("header", 1, {top: 0});

      // 키 비주얼 모션
      gsap.to(".kv-area", {
        scrollTrigger: {
          trigger: ".kv-area",
          endTrigger: ".kv-area .desc-box",
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
          onEnter: function () {
            gsap.to(".kv-area .desc-box", 0.1, {
              scrollTrigger: {
                trigger: ".kv-area",
                endTrigger: ".kv-area .desc-box .desc",
                start: "top top",
                end: "bottom top",
                scrub: 1
              },
              y: 0
            });

            gsap.to(".kv-area .kv-box", 0.1, {
              scrollTrigger: {
                trigger: ".kv-area",
                endTrigger: ".kv-area .desc-box .desc",
                start: "top top",
                end: "bottom top",
                scrub: 1,
                onUpdate: function (self) {
                  if (self.progress >= 0.7) {
                    $(".kv-area .inner.kv").addClass("on");
                    $(".kv-area .kv-box").addClass("on");
                  }
                },
                onLeaveBack: function () {
                  $(".kv-area .inner.kv").removeClass("on");
                  $(".kv-area .kv-box").removeClass("on");
                }
              },
              y: 0
            });
          }
        },
      });

      // 지속가능경영 소개 모션
      gsap.to(".info-area .info-tit .tit-item", {
        scrollTrigger: {
          trigger: ".info-area",
          start: "top 30%",
          end:"top top",
          onEnter: function () {
            gsap.to(".info-area .info-tit .tit-item img", .4, {top: 0});
          }
        }
      });

      $(".info-area .inner > div .img").each(function (index, imgItem) {
        gsap.to(imgItem, .7, {
          scrollTrigger: {
            trigger: imgItem,
            start: "top 70%",
            end: "top top",
            onEnter: function () {
              $(imgItem).addClass("on");
            }
          },
        });
      });

      $(".info-area .txt").each(function (index, txtItem) {
        gsap.to($(txtItem).find("li"), .5, {
          scrollTrigger: {
            trigger: txtItem,
            start: "top 70%",
            end: "top top"
          },
          y: 0,
          opacity: 1,
          stagger: 0.3
        });
      });

      // // ESG 평가, KT&G Report 모션
      $(".motion").each(function (index, motionItem) {
        gsap.to(motionItem, .5, {
          scrollTrigger: {
            trigger: motionItem,
            start: "top 63%",
            end: "top top"
          },
          y: 0,
          opacity: 1
        })
      });

      // 링크 모션
      gsap.to(".link-area .link-item", .5, {
        scrollTrigger: {
          trigger: ".link-area",
          start: "top 55%",
          end: "top top"
        },
        y: 0,
        opacity: 1,
        stagger: 0.3
      });
    }
  }
})();
