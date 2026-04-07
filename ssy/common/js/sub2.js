$(function () {
  sub1Fnc.common();
});

const sub1Fnc = (function () {
  return {
    common () {
      setTimeout(function () {
        /* scroll-motion */
        if ($(".scroll-motion").length > 0) {
          $(".scroll-motion:visible").each(function (index) {
            gsap.to($(this), {
              scrollTrigger: {
                trigger: $(this),
                start: "top 80%",
                end: "bottom top",
                toggleClass: {
                  targets: $(".scroll-motion:visible").eq(index),
                  className: "active",
                },
                once: true
              },
            });
          });
        }

        /* top 진입 모션 */
        $(".top .motion").each(function (index, item) {
          gsap.to(item, {
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom bottom",
              toggleClass: {
                targets: $(".top .motion").eq(index),
                className: "active"
              },
              once: true
            }
          });
        });

        /* progress 모션 */
        gsap.to(".section1", {
          scrollTrigger: {
            trigger: ".section1",
            start: "top center",
            end: "bottom bottom",
            once: true,
            onEnter: function () {
              setTimeout(function () {
                $(".section1 .progress-wrap .progress-track").addClass("active");
              }, 700);

              setTimeout(function () {
                $(".section1 .progress-wrap .progress-track + img").addClass("active");
              }, 1400);
            }
          }
        });
      }, 300);
    }
  }
})();
