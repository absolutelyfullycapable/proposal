$(function () {
  sub2Fnc.common();
});

const sub2Fnc = (function () {
  return {
    common () {
      window.onload = function () {
        // Header
        $(window).on("scroll", function () {
          if (window.scrollY > 0) {
            $("header").addClass("active");
          } else {
            $("header").removeClass("active");
          }
        });

        $("header .inner .gnb a").hover(
          function () {
            $("header .menu").addClass("on");
          },
          function () {
            $("header .menu").removeClass("on");
          }
        );

        // News
        gsap.to(".news .right", {
          scrollTrigger: {
            trigger: ".news .right",
            start: "top 64px",
            end: "bottom 474px",
            pin: true
          }
        });
      }
    }
  };
})();
