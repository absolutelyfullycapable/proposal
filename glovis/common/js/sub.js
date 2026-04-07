$(window).on("load", function () {
  commonScript.commonFn();
  commonScript.scrollFn();
  commonScript.scrollTriggerFn();
});

const commonScript = (function () {
  return {
    commonFn: function () {
      // 목록 아이템 hover시 모양 변경 이벤트
      $(".list-item").each(function (q) {
        if (q == 0 || q == 1 || q == 4 || q == 24) {
          // 기본 상태 - 일반적인 둥근 사각형
          const initialPath = 'path("M 26 0 H 324 C 337 0 350 13 350 26 V 246 C 350 350 350 350 350 350 C 350 350 350 350 350 350 C 350 350 350 350 350 350 H 26 C 13 350 0 337 0 324 V 26 C 0 13 13 0 26 0 Z")';

          // hover 상태 - 오른쪽 하단에 큰 원형이 파인 형태
          const hoverPath = 'path("M 26 0 H 324 C 337 0 350 13 350 26 V 240 C 350 265 334 262 306 262 C 262 262 262 300 262 318 C 265 350 246 350 246 350 H 26 C 13 350 0 337 0 324 V 26 C 0 13 13 0 26 0 Z")';

          // 초기 상태 설정
          $(this).find(".list-shape").css("clip-path", initialPath);

          $(this).hover(
            function () {
              gsap.to($(this).find(".list-shape"), {
                clipPath: hoverPath,
                duration: 0.45,
                ease: "power3.easeOut",
              });
            },
            function () {
              gsap.to($(this).find(".list-shape"), {
                clipPath: initialPath,
                duration: 0.45,
                ease: "power3.easeOut",
              });
            }
          );
        }
      });

      // 탭 클릭 이벤트
      $(".sub-wrap .tab-area a").on("click", function () {
        let idx = $(this).index();

        $(".sub-wrap .tab-area a").removeClass("on");
        $(this).addClass("on");

        $(".sub-wrap .con-area .con").removeClass("on");
        $(".sub-wrap .con-area .con").eq(idx).addClass("on");

        $(".scroll-motion.active").removeClass("active");
        scrollMotion();
      });
    },
    scrollFn: function () {
      let lastY = 0;

      $(window).on("scroll", function () {
        const scrollTop = $(window).scrollTop();

        if (scrollTop > lastY) {
          // 내려갈때
          $("header").addClass("hide");
          $(".quick-menu").addClass("scroll");
        } else {
          // 올라갈때
          $("header").removeClass("hide");

          if (scrollTop == 0) {
            $(".quick-menu").removeClass("scroll");
          }
        }

        if (scrollTop + $(window).innerHeight() > $("footer").offset().top - 76) {
          $(".quick-menu").addClass("fixed");
        } else {
          $(".quick-menu").removeClass("fixed");
        }

        lastY = scrollTop;
      });
    },
    scrollTriggerFn: function () {
      scrollMotion();
    },
  };
})();

const scrollMotion = () => {
  gsap.utils.toArray(".scroll-motion").forEach((item) => {
    gsap.to(item, {
      scrollTrigger: {
        trigger: item,
        start: () => "top-=60rem 75%",
        end: () => "bottom top",
        toggleClass: { targets: item, className: "active" },
        once: true
      },
    });
  });
};
