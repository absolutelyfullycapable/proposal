$(function () {
  sub2Fnc.common();
});

const sub2Fnc = (function () {
  return {
    common () {
      setTimeout(function () {
        /* kv 아치 모션 */
        gsap.to(".arch-box .arch-wrap", 1, {
          width: 560,
          height: 720,
          bottom: 0,
          x: "-50%",
          transform: "translateX(-50%)"
        });

        gsap.to(".arch-box .arch-color", 1, {
          width: 560,
          height: 720,
          bottom: 0,
          x: "-50%",
          transform: "translateX(-50%)"
        });

        setTimeout(function () {
          gsap.to(".arch-box", 2, {
            opacity: 0
          });

          gsap.to(".arch-box .arch-wrap", 2, {
            width: "220%",
            height: "220%"
          });
        }, 1100);

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

        /* 필터 */
        $(".btn-filter-search").on("click", function () {
          if ($(this).hasClass("active")) {
            $(this).removeClass("active");
          } else {
            $(this).addClass("active");
          }

          if ($(".filter-detail").hasClass("show")) {
            $(".filter-detail").slideUp(500).removeClass("show");
            setTimeout(function () {
              $(".search-wrap").removeClass("bd");
            }, 500);
          } else {
            $(".filter-detail").slideDown(500).addClass("show");
            $(".search-wrap").addClass("bd");
          }
        });

        $(".filter-detail .select-list-box .list-wrap").on("click", function () {
          $(this).addClass("on");
          $(".filter-detail .selected-box .selected-option-list img").addClass("on");
        });

        $(".filter-detail .select-list-box a").on("click", function () {
          $(".btn-filter-search").removeClass("active").addClass("finish");
          $(".filter-detail").slideUp(500).removeClass("show");
          setTimeout(function () {
            $(".search-wrap").removeClass("bd");
          }, 500);
          $(".list-wrap .list-item:not(.selected)").hide();
          ScrollTrigger.refresh();
        });

        /* list-item 모션 */
        $(".list-wrap .list-item").each(function (index, item) {
          gsap.to(item, {
            scrollTrigger: {
              trigger: item,
              start: "top 70%",
              end: "bottom bottom",
              toggleClass: {
                targets: $(".list-wrap .list-item").eq(index),
                className: "active"
              },
              once: true
            }
          });
        });
      }, 300);

      /* kv-area 스와이퍼 */
      setTimeout(function () {
        const bulletTxt = [
          "더 플래티넘 스카이헤론",
          "지제역 반도체밸리 쌍용 더 플래티넘",
          "더 플래티넘 스카이헤론"
        ];

        var kvSwiper = new Swiper(".kv-area .swiper-container", {
          speed: 1000,
          loop: true,
          autoplay: {
            delay: 4000,
            disableOnInteraction: false
          },
          pagination: {
            el: ".swiper-pagination",
            renderBullet: function (index, className) {
              return `<div class="${className}">
                <div class="progress-bar">
                  <span class="progress-bar-track"></span>
                </div>
                <p>${bulletTxt[index]}</p>
              </div>`;
            }
          },
          on: {
            slideChangeTransitionEnd: function () {
              $(".kv-area .swiper-container .swiper-slide .txt-box > div img").removeClass("on");
              $(".kv-area .swiper-container .swiper-slide").each((index, slide) => {
                if (slide.getAttribute("data-swiper-slide-index") == this.realIndex) {
                  $(slide).find(".txt-box > div img").addClass("on");
                }
              });

              gsap.killTweensOf(".progress-bar-track");
              gsap.set(".progress-bar-track", {
                width: "0%"
              });

              let activeBullet = $(".swiper-pagination-bullet").eq(this.realIndex).find(".progress-bar-track");

              gsap.to(activeBullet, 4, {
                width: "100%",
                ease: "linear"
              });
            }
          }
        });

        let firstTrack = $(".swiper-pagination-bullet").eq(0).find(".progress-bar-track");
        gsap.to(firstTrack, {
          width: "100%",
          duration: 4,
          ease: "linear"
        });
      }, 1600);
    }
  }
})();
