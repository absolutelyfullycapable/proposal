$(function() {
  sub.common();
});

const sub = (function () {
  return {
    common () {
      gsap.to("header", 0.7, {
        y: 0,
        opacity: 1,
      });

      gsap.to(".gnb", 0.7, {
        y: 0,
        opacity: 1,
      });

      gsap.to(".pop-area .util-btn", 0.7, {
        y: 0,
        opacity: 1,
      });

      gsap.to(".pop-area .util-btn", {
        scrollTrigger: {
          trigger: ".cont-wrap",
          start: "top top",
          end: "bottom bottom",
          endTrigger: ".pop-area",
          onEnterBack: () => {
            $(".pop-area .util-btn").addClass("fixed");
          },
          onLeave: () => {
            $(".pop-area .util-btn").removeClass("fixed");
          },
        }
      });
    }
  }
})();
