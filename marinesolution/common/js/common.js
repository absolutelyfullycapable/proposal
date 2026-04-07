$(function () {
  common.header();
  common.motion();
});

const common = (function () {
  return {
    header() {
      gsap.to("#header", {
        y: 0,
        duration: 0.6,
      });
      window.addEventListener("scroll", () => {
        if (helper.getScrollDirect() === "down") {
          $("header").removeClass().addClass("down");
          gsap.to("#header", {
            y: "-100%",
            duration: 0.3,
          });
        } else if (helper.getScrollDirect() === "up") {
          $("header").removeClass().addClass("up");
          gsap.to("#header", {
            y: 0,
            duration: 0.3,
          });
        } else if (helper.getScrollDirect() === "top") {
          $("header").removeClass().addClass("top");
        }
      });
    },
    motion() {
      $(".news-tab a").on("click", function () {
        if (!$(this).hasClass("on")) {
          $(".news-tab a.on").removeClass("on");
          $(this).addClass("on");

          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 600);
        }
      });

      gsap.utils.toArray(".scroll-motion").forEach((item) => {
        gsap.to(item, {
          scrollTrigger: {
            trigger: item,
            start: () => "top 75%",
            end: () => "bottom top",
            toggleClass: { targets: item, className: "active" },
            once: true,
            markers: true,
            invalidateOnRefresh: true,
          },
        });
      });
    },
  };
})();
