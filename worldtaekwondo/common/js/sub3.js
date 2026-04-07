$(function () {
  sub3Fnc.common();
});

const sub3Fnc = (function () {
  return {
    common () {
      window.onload = function () {
        // Header, progress bar
        $(window).on("scroll", function () {
          let windowScrollHeight = $(".wrap").prop("scrollHeight") - $(window).height();
          let windowScrollY = window.scrollY;
          let progressPercent = (windowScrollY / windowScrollHeight) * 100;

          if (windowScrollY > 0) {
            $("header").addClass("active");
            $(".content .progress-bar").addClass("active");
          } else {
            $("header").removeClass("active");
            $(".content .progress-bar").removeClass("active");
          }

          $(".content .progress-bar .progress-track").css("width", progressPercent + "%");
        });

        $("header .inner .gnb a").hover(
          function () {
            $("header .menu").addClass("on");
          },
          function () {
            $("header .menu").removeClass("on");
          }
        );

        // prev 화살표 고정
        gsap.to(".content .left", {
          scrollTrigger: {
            trigger: ".content .left",
            start: "top 104px",
            end: "3300px top",
            endTrigger: ".content .right",
            pin: true
          }
        });
      }
    }
  };
})();
