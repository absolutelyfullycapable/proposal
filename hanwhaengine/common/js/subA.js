$(function() {
  sub.common();
});

const sub = (function () {
  return {
    common () {
      gsap.registerPlugin(ScrollTrigger);

      // 헤더
      gsap.to("header", 0.7, {
        top: 0,
        delay: 1.2,
        ease: Power3.easeOut
      });

      $(window).on('scroll', function(){
        if($(window).scrollTop() > 100){
          gsap.to("header", { top: -100, duration: 0.7, ease: Power3.easeOut });
        } else {
          gsap.to("header", { top: 0, duration: 0.7, ease: Power3.easeOut });
        }
      });

      // scrl-motion 공통 모션
      $(".scrl-motion").each(function (idx, item) {
        gsap.to(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end:"bottom top",
            toggleClass: {
              targets: $(item),
              className: "active"
            },
            once: true
          },
        });
      });

      // kv 모션
      const kvTl = gsap.timeline();

      kvTl.to(".kv-wrap .bg-box img", 1, {
        scale: 1
      }, 0)
        .add(function () {
          $(".kv-wrap .txt-box .fade-motion").each(function(motionIdx, motionItem) {
            gsap.to(motionItem, .7, {
              delay: motionIdx * .4,
              opacity: 1,
              y: 0
            })
          });
        }, "+=0.5");

      gsap.to(".kv-wrap", {
        scrollTrigger: {
          trigger: ".kv-wrap",
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          onUpdate(self) {
            const y = gsap.utils.interpolate(636, -288, self.progress);

            gsap.set(".kv-wrap .txt-box .right", { y });
          }
        }
      });

      // 선박엔진 사업 특장점 hover
      $(".feature-box > div:not(.box)").hover(function () {
        $(this).find(".off").removeClass("active");
        $(this).find(".on").addClass("active");
      }, function () {
        $(this).find(".off").addClass("active");
        $(this).find(".on").removeClass("active");
      });

      // 비디오 재생
      $(".video-box .btn button").on("click", function () {
        $(this).closest(".btn").addClass("hide");
        $(".video-box video").get(0).play();
      });

      // 비전
      const sec5Tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".cont-sec5 .pin-wrap",
          start: "top top",
          end: "+=200%",
          pin: true,
          pinSpacing: false,
          scrub: 1
        }
      });

      sec5Tl.to(".cont-sec5 .shape1", {top: "-150%"})
      .to(".cont-sec5 .shape2", {top: -500}, "<")
      .to(".cont-sec5 .img1", {top: "-120%"}, "<")
      .to(".cont-sec5 .img3", {top: -400}, "<")
      .to(".cont-sec5 .tit-box", {top: -93}, "<+0.05")
      .to(".cont-sec5 .img2", {top: -650}, "<+0.1")
      .to(".cont-sec5 .shape3", {top: -1600}, "<+0.1")
      .to(".cont-sec5 .tit-box", {top: -93}, "<+0.2");

      // 라인업
      const item2Tl = gsap.timeline({ paused: true });

      item2Tl.fromTo(
        ".cont-sec6 .prod-wrap .prod-item.item2 img",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.4,
          ease: "power2.out"
        }
      );

      const sec6Tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".cont-sec6",
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: true,
          pinSpacing: false,
          onEnter: () => {
            gsap.delayedCall(0.3, () => {
              $(".cont-sec6 .prod-wrap .item1 .img-box").addClass("active");

              $(".cont-sec6 .prod-wrap .prod-item.item1 .tit-box").addClass("active");
              $(".cont-sec6 .prod-wrap .prod-item.item1 .util-box").addClass("active");
            });
          },
          onLeaveBack: () => {
            gsap.delayedCall(0.3, () => {
              $(".cont-sec6 .prod-wrap .item1 .img-box").removeClass("active");

              $(".cont-sec6 .prod-wrap .prod-item.item1 .tit-box").removeClass("active");
              $(".cont-sec6 .prod-wrap .prod-item.item1 .util-box").removeClass("active");
            });
          },
          onUpdate: (self) => {
            if (self.progress >= 0.6) {
              item2Tl.play();
            } else {
              item2Tl.reverse();
            }
          }
        }
      });

      sec6Tl.to(".cont-sec6 .prod-wrap .prod-item.item1", {
        top: "-100%",
        delay: 0.5,
        ease: "none"
      })
      .to(".cont-sec6 .prod-wrap .prod-item.item2", {});

      // 푸터
      gsap.to("footer", {
      scrollTrigger: {
        trigger: "footer",
        start: "top center",
        onEnter: () => {
          gsap.utils.toArray("footer .inner a").forEach((aItem, aIdx) => {
            gsap.delayedCall(aIdx * 0.3, () => {
              aItem.classList.add("active");
            });
          });
        }
      }
    });
    }
  }
})();
