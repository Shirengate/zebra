document.addEventListener("DOMContentLoaded", function () {
  /// смена темы

  $(".changeTheme").click(function (e) {
    const paths = $("path");
    $.each(paths, function (indexInArray, valueOfElement) {
      if ($(this).attr("fill") == "white") {
        $(this).attr("fill", "black");
      } else if ($(this).attr("fill") === "black") {
        $(this).attr("fill", "white");
      }
    });
  });

  // получение проектов

  $.ajax({
    type: "get",
    url: "json/projects.json",
    dataType: "json",
    success: function (response) {
      for (let i of response.projects) {
        $(".projectNames").append(`<a href="#">${i.name}</a>`);
      }

      const links = $(".projectNames a");
      const currentLayer = $(".background-layer.current");
      const nextLayer = $(".background-layer.next");

      links.each(function (index) {
        $(this).hover(
          function () {
            // Устанавливаем изображение для следующего слоя
            nextLayer.css(
              "background-image",
              `url(${response.projects[index].src})`
            );

            // Делаем следующий слой видимым
            nextLayer.css("opacity", 1);

            // После завершения анимации переключаем классы
            setTimeout(() => {
              currentLayer.css("opacity", 0);
              currentLayer.removeClass("current").addClass("next");
              nextLayer.removeClass("next").addClass("current");
            }, 500); // Время должно совпадать с transition
          },
          function () {
            // При уходе мыши убираем следующий слой
            nextLayer.css("opacity", 0);
          }
        );
      });
    },
    error: function (error) {
      console.log(error);
    },
  });

  /// плавная прокрутка
  const anchors = document.querySelectorAll(".fixedHeader > a");

  for (let anchor of anchors) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const blockID = anchor.getAttribute("href").slice(1);
      document.getElementById(blockID).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }
  /// опасити для логотипов в партнерке
  $(".parthnersLogoBox > svg")
    .attr("width", "100")
    .attr("height", "100")
    .css("opacity", "0.8");

  // меню бургер
  const wrapperHeight = "1900px";
  $(".mobileMenu").hide();
  $(".burgerBtn ").click(function () {
    $(".mobileMenu").toggleClass("menu");
    if ($(".mobileMenu").hasClass("menu")) {
      $(".mobileMenu").show();
      $(".changeTheme").hide();
      $(".burgerBtn").removeClass("fa-solid fa-bars");
      $(".burgerBtn").addClass("fa-solid fa-xmark");
      $(".burgerBtn").css("color", "black");
      $(".mobileMenu").css("transform", "translate(-100%)");
      const menuWidth = "663.2px";
      console.log(menuWidth);
      $(".wrapper").css({
        height: `720px`,
        overflow: "hidden",
      });
    } else {
      $(".changeTheme").show();
      $(".burgerBtn").removeClass("fa-solid fa-xmark");
      $(".burgerBtn").addClass("fa-solid fa-bars");
      $(".burgerBtn").css("color", "black");
      $(".mobileMenu").css("transform", "translate(100%)");
      $(".wrapper").css({
        height: `${wrapperHeight}`,
        overflow: "none",
      });
    }
  });
});
