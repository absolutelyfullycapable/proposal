$(function () {
  sub1Fnc.common();
});

const sub1Fnc = (function () {
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
      }
    }
  };
})();
