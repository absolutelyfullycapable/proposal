$(window).load(function () {
  sub2Fnc.common();
});

const sub2Fnc = (function() {
  return {
    common() {
      // 페이지 진입 시 헤더 모션
      gsap.to("header", 1, {top: 0});

      // // 태그 클릭, 스크롤 이벤트
      $(".list-util-btn .btn-tag").on("click", function () {
        $(".list-area .list-top-box .tag").slideDown(500);
      });

      $(".list-area .list-top-box .tag").on("click", function () {
        $(this).slideUp(500)
      });

      gsap.to(".list-area .list-top-box", {
        scrollTrigger: {
          trigger: ".list-area .list-top-box",
          start: "top top",
          endTrigger: ".list-area",
          pin: true,
          pinSpacing: false
        }
      });

      // 리스트 모션
      $(".list-area .list-box li").each(function (index, listItem) {
        gsap.to($(listItem).find("img"), {
          scrollTrigger: {
            trigger: listItem,
            start: "top 65%",
            end: "top top"
          },
          y: 0,
          opacity: 1,
          stagger: .2
        });
      });

      // 페이지네이션 모션
      gsap.to(".pagination-area img", {
        scrollTrigger: {
          trigger: ".pagination-area",
          start: "top 65%",
          end: "top top"
        },
        y: 0,
        opacity: 1
      });
    }
  }
})();
