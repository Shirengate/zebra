document.addEventListener("DOMContentLoaded", function () {
  /// смена темы

  console.log($('.changeTheme').css('color'))

  /// запоминание темы для системы
  $(".changeTheme").click(function (e) {
    if($('.changeTheme').css('background-color') === 'rgb(0, 0, 0)'){  
      $(this).css('background-color','rgb(255, 255, 255)')
      localStorage.setItem('theme','black')
    }else if($('.changeTheme').css('background-color') === 'rgb(255, 255, 255)'){ 
      $(this).css('background-color','rgb(0, 0, 0)')
      localStorage.setItem('theme','white')
    }

    /// получение темы
    const theme = localStorage.getItem('theme');
    if(theme === 'black'){
      $('*').css('color','white');
      $(".leftColumn").css('background-color','white');
      $(".rightColumn").css('background-color','black');
      $(".projectNames a").css({
        'background-color':'black'
      })
      $(".projectNames a").hover(function () {
        $(this).css({
          'background-color': 'white',
          'color': 'black',
          'padding-left': '30px'
        })
          
        }, function () {
          $(this).css({
            'background-color': 'black',
            'color': 'white',
            'padding-left': '0px'
          })
        }
      );
    }else if(theme === 'white'){
      $('*').css('color','black');
      $(".leftColumn").css('background-color','black');
      $(".rightColumn").css('background-color','white');
    }
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
            $(this).css({
              'background-color': 'black',
              'color': 'white',
              'padding-left': '30px'
            })
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
            $(this).css({
              'background-color': 'white',
              'color': 'black',
              'padding-left': '0px'
            })
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
