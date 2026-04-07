const helper = (function () {
  let lastScrollY = 0;
  let currentDirection = "up";
  let resizeMode = null;

  window.addEventListener("scroll", () => {
    const scrollTop = document.scrollingElement.scrollTop;
    if (scrollTop >= 0) {
      currentDirection = scrollTop > lastScrollY ? "down" : scrollTop === 0 ? "top" : "up";
      lastScrollY = scrollTop;
    }
  });

  // 이벤트 트리거<!-- 스크롤 영역 START -->
  window.dispatchEvent(new Event("scroll"));

  return {
    // ⭐️ 스크롤 퍼센티지 구하기
    /**
     * 스크롤 퍼센티지값 0~100까지 숫자 리턴
     * @return {number}
     */
    getScrollPercentage() {
      const scrollTop = document.scrollingElement.scrollTop;
      const documentHeight = document.scrollingElement.scrollHeight;
      const viewportHeight = document.scrollingElement.clientHeight;
      return Math.round((scrollTop / (documentHeight - viewportHeight)) * 100);

      /*
      📌 usage ==> 0~100 출력
      window.addEventListener("scroll", () => {
        console.log(helper.getScrollPercentage());
      })
      */
    },

    // ⭐️ 스크롤 up,down & top 구하기
    /**
     * down(⬇️), up(⬆️), top(0) 스크롤 방향에 따른 문자열 리턴
     * @return {string}
     */
    getScrollDirect() {
      return currentDirection;

      /*
      📌 usage ==> up, down, top 문자열 출력
      window.addEventListener("scroll", () => {
        if(helper.getScrollDirect() === "down") {
          
        } else if(helper.getScrollDirect() === "up") {
          if(helper.getScrollDirect() === "top") {

          }
        }
      })
      */
    },

    // ⭐️ 모달 오픈(접근성)
    /**
     * 첫번째 파라미터(팝업 class), 두번째 파라미터(되돌아갈 element class), 
     * @param {string} target
     * @param {string} target
     */
    showModal(name, returnEle) {
      lastScrollPosition = window.scrollY; //팝업 close시 GSAP 있을 때 스크롤 위치 이상해지는 것 때문에 추가
      $(name).show().attr("tabindex", 0).focus();
      $("body").addClass("stop-scroll");

      gsap.from($(name).children(), { y: 80, opacity: 0, ease: Power3.inOut });

      const focusableList = $(name).find('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const focusableItem = $(focusableList).toArray();
      const firstElement = focusableItem[0];
      const lastElement = focusableItem[focusableItem.length - 1];

      $(name).on("keydown", function (e) {
        if (e.keyCode === 9) {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      });

      $(name).find(".btn-close").on("click", function () {
        $(name).hide();
        $(returnEle).attr("tabindex", 0).show().focus();
        $("body").removeClass("stop-scroll");
        window.scrollTo(0, lastScrollPosition); //팝업 close시 GSAP 있을 때 스크롤 위치 이상해지는 것 때문에 추가
      });

      // dimd click 시 닫힘
      $(name).on("click", function (e) {
        if (e.target === $(name)[0]) {
          $(name).hide();
          $(returnEle).attr("tabindex", 0).show().focus();
          $("body").removeClass("stop-scroll");
        }
      });

      /*
      📌 usage
      $(".btn-open-popup").on("click", function() {
        helper.showModal(".popup-name", ".return-element")
      })
      */
    },

    // ⭐️ 접속 환경, 디바이스 체크
    getDetectDevice() {
      const userAgent = navigator.userAgent.toLowerCase();

      const isIOS = /iphone|ipad|ipod/.test(userAgent);
      const isAndroid = /android/.test(userAgent);
      const isIPad = /ipad/.test(userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
      const isIPhone = /iphone/.test(userAgent);
      const isMobile = /mobile|android|iphone|ipad|ipod/.test(userAgent);

      return {
        isPC: !isMobile,
        isMobile: isMobile,
        isIOS: isIOS,
        isAndroid: isAndroid,
        isIPad: isIPad,
        isIPhone: isIPhone,
      };
    },

    // ⭐️ 스크롤 모션 엘리먼트 체크
    /**
     * 파라미터로 타겟의 class 네임 삽입 ➡️ ".scroll-motion"
     * @param {string} target
     */
    scrollMotion(target) {
      if ($(target).length) {
        // const targetItem = document.querySelectorAll(target);
        const targetItem = $(target);

        setTimeout(() => {
          ScrollTrigger.refresh();
          gsap.utils.toArray(targetItem.filter(":visible")).forEach(item => {
            gsap.to(item, {
              scrollTrigger: {
                trigger: item,
                start: () => "top-=60rem 75%",
                end: () => "bottom top",
                toggleClass: { targets: item, className: "active" },
                once: true,
                // markers: true,
              },
            });
          })
        }, 100)
      }

      /*
      📌 usage
      helper.scrollMotionFn(".scroll-motion");
      */
    },

    // ⭐️ target으로 스크롤 이동
    /**
     * 파라미터로 타겟의 class 네임 삽입 ➡️ "#header"
     * @param {string} target
     */
    scrollToTarget(target) {
      const targetItem = document.querySelector(target);
      targetItem.scrollIntoView({ behavior: "smooth", block: "start" });

      /*
      📌 usage
      helper.scrollToTarget("#header");
      */
    },

    // ⭐️ resize시 breakpoint에 따라 1번씩만 실행
    /**
     * 1. 인자는 1024가 default
     * 2. const resizeMode = helper.resizeOnce(); 로 pc, mob 문자열 return
     * 3. resizeMode를 조건문으로 처리 if(resizeMode === "pc")
     * @param {number} target
     */
    resizeOnce(breakpoint = 1024) {
      const newResizeMode = window.innerWidth >= breakpoint ? "pc" : "mob";

      if (resizeMode === null) {
        resizeMode = newResizeMode;
        return resizeMode;
      } else {
        if (newResizeMode !== resizeMode) {
          resizeMode = newResizeMode;
          return newResizeMode;
        }
      }

      return null;

      /*
      📌 usage
      $(window).on("resize", _.throttle((e) => {
        const resizeMode = helper.resizeOnce();
        if (resizeMode === "pc") {
          console.log("pc");
        } else if (resizeMode === "mob") {
          console.log("mob");
        }
      }, 100))
      */
    }
  };
})();
