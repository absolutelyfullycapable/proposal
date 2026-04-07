$(function() {
  main.common();
});

const main = (function () {
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

        // photo, video 영역
        gsap.to(".photo .right", {
          scrollTrigger: {
            trigger: ".photo .right",
            start: "top 64px",
            end: "bottom 365px",
            pin: true
          }
        });

        gsap.to(".video .left", {
          scrollTrigger: {
            trigger: ".video .left",
            start: "top 64px",
            end: "bottom 365px",
            pin: true
          }
        });

        // floating btn, 팝업
        function resizeWidth () {
          if (!$(".layer-popup").hasClass("active")) {
            $(window).off("resize", resizeWidth);
            return;
          }

          let item1Width = (($(".layer-popup .item1").innerWidth() - 20) / $(window).innerWidth()) * 100;
          let item2Width = (($(".layer-popup .item2").innerWidth() - 15) / $(window).innerWidth()) * 100;

          $(".layer-popup .item2").css("right", item1Width + "%");
          $(".layer-popup .item3").css("right", item1Width + item2Width + "%");
        }

        $(".floating-btn").on("click", function () {
          $("body").css("overflow", "hidden");
          $(".layer-popup").addClass("active");
          $(".layer-popup .bg").addClass("active");

          resizeWidth();
          $(window).on("resize", resizeWidth);
        });

        function popupClose () {
          $("body").css("overflow", "");
          $(".layer-popup").removeClass("active");
          $(".layer-popup .item2").css("right", "-100%");
          $(".layer-popup .item3").css("right", "-100%");

          $(window).off("resize", resizeWidth);

          setTimeout(function () {
            $(".layer-popup .bg").removeClass("active");
          }, 400);
        }

        $(".layer-popup .btn-close, .layer-popup .bg").on("click", popupClose);
      }
    }
  }
})();
